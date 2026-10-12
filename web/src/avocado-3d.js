import * as THREE from './three.module.min.js';

// Both halves are closed volumes from the SAME surface. Their cut faces meet
// at z=0; all materials are opaque and depth-tested, including during opening.
export async function createAvocado(container, onFailure) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .94;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onFailure(); });
  container.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 50);
  camera.position.set(0, .1, 9.6);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xfff9ec, 0x394228, .75));
  const key = new THREE.DirectionalLight(0xfff5e7, 2.7);
  key.position.set(-3, 5, 12); scene.add(key);
  key.castShadow = true;
  key.shadow.mapSize.set(512,512);
  Object.assign(key.shadow.camera,{left:-4,right:4,top:4,bottom:-4,near:.1,far:24});
  key.shadow.bias = -.00015;
  key.shadow.normalBias = .015;
  const edge = new THREE.DirectionalLight(0xe7efce, 1.3);
  edge.position.set(4, 2, -3); scene.add(edge);
  const fill = new THREE.DirectionalLight(0xffffff, .4);
  fill.position.set(3, -1, 4); scene.add(fill);

  // Broad studio reflections reveal the curvature without a plastic pinpoint
  // highlight. Generated once, then reused by the scroll-driven renderer.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(.12, .12, .11);
  for (const [x,y,z,w,h,intensity] of [[-4,5,5,3,5,3],[5,2,1,2,4,1.4],[0,5,-4,4,2,2]]) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({color:new THREE.Color(intensity,intensity,intensity),side:THREE.DoubleSide}));
    panel.position.set(x,y,z); panel.lookAt(0,0,0); studio.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, .025);
  scene.environment = environment.texture;
  scene.environmentIntensity = .55;
  pmrem.dispose(); studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});

  const loader = new THREE.TextureLoader();
  const maps = await Promise.all(['skin','stone','pulp'].map(name=>loader.loadAsync(new URL(`avocado-${name}-natural.webp`,import.meta.url).href)));
  const [skinColor,stoneColor,pulpColor] = maps;
  for (const map of maps) {map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());}
  const skin=new THREE.MeshPhysicalMaterial({map:skinColor,bumpMap:skinColor,roughness:.54,bumpScale:.025,specularIntensity:.4});
  const stone=new THREE.MeshPhysicalMaterial({map:stoneColor,color:0xbec9b5,bumpMap:stoneColor,roughness:.46,bumpScale:.01,specularIntensity:.45});
  const flesh=new THREE.MeshPhysicalMaterial({map:pulpColor,vertexColors:true,roughness:.48,bumpMap:pulpColor,bumpScale:.009,specularIntensity:.45,clearcoat:.08,clearcoatRoughness:.4});

  // Sample the same peel image for a small real geometric relief. The larger
  // bumps affect the silhouette and normals; the material adds fine detail.
  const sampleCanvas=document.createElement('canvas');sampleCanvas.width=sampleCanvas.height=256;
  const sampleContext=sampleCanvas.getContext('2d',{willReadFrequently:true});
  sampleContext.drawImage(skinColor.image,0,0,256,256);
  const peelPixels=sampleContext.getImageData(0,0,256,256).data;
  function peelHeight(u,v){
    const x=((u%1+1)%1)*255,y=(1-((v%1+1)%1))*255;
    const index=(Math.floor(y)*256+Math.floor(x))*4;
    return (peelPixels[index]*.3+peelPixels[index+1]*.6+peelPixels[index+2]*.1)/255;
  }
  const front=new THREE.Group(), back=new THREE.Group(), fruit=new THREE.Group();
  fruit.add(front,back);scene.add(fruit);
  const height=1.65, pitY=-.39, pitRadius=.56;
  function profile(phi){return Math.sin(phi)*(1-.26*Math.cos(phi))*(1+.007*Math.sin(phi*15)+.003*Math.sin(phi*31));}
  function center(phi){return .055*Math.sin(phi*1.4)*Math.sin(phi);}
  function mesh(positions,indices,uv,colors,material){
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    if(uv.length)g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
    if(colors.length)g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
    g.setIndex(indices);g.computeVertexNormals();
    const result = new THREE.Mesh(g,material);
    result.castShadow = material === skin;
    result.receiveShadow = true;
    return result;
  }
  function shell(sign){
    const p=[],uv=[],idx=[],rows=176,cols=144;
    for(let j=0;j<=rows;j++){
      const phi=Math.PI*j/rows,r=profile(phi),y=height*Math.cos(phi);
      for(let i=0;i<=cols;i++){
        const theta=Math.PI*i/cols;
        const u=sign>0?i/cols:2-i/cols,v=j/rows*1.5;
        const seamFade=Math.min(1,Math.sin(theta)*16)*Math.sin(phi);
        const ripple=1+(peelHeight(u,v)-.25)*.035*seamFade;
        p.push(center(phi)+r*Math.cos(theta)*ripple,y,sign*r*.84*Math.sin(theta)*ripple);
        uv.push(u,v);
        if(j<rows&&i<cols){const a=j*(cols+1)+i,b=a+cols+1;idx.push(...(sign>0?[a,a+1,b,b,a+1,b+1]:[a,b,a+1,b,b+1,a+1]));}
      }
    }
    return mesh(p,idx,uv,[],skin);
  }
  function cut(sign){
    // Polar rings follow the round stone cavity exactly, eliminating the
    // saw-tooth edge created by clipping a rectangular grid to a sphere.
    const p=[],idx=[],colors=[],uv=[],inner=36,outer=46,rows=inner+outer,cols=160;
    const yellow=new THREE.Color('#fffde8'),green=new THREE.Color('#43bd22'),edgeColor=new THREE.Color('#303b14');
    const boundaries=[];
    for(let i=0;i<=cols;i++){
      const angle=i/cols*Math.PI*2,dx=Math.cos(angle),dy=Math.sin(angle);
      let low=0,high=4;
      for(let n=0;n<30;n++){
        const d=(low+high)/2,y=pitY+dy*d;
        const phi=Math.acos(THREE.MathUtils.clamp(y/height,-1,1));
        if(Math.abs(y)<=height && Math.abs(dx*d-center(phi))<=profile(phi)) low=d;else high=d;
      }
      boundaries.push(low);
    }
    for(let j=0;j<=rows;j++) for(let i=0;i<=cols;i++){
      const angle=i/cols*Math.PI*2;
      const radius=j<=inner ? pitRadius*Math.sin(j/inner*Math.PI/2) : pitRadius+(boundaries[i]-pitRadius)*(j-inner)/outer;
      const x=Math.cos(angle)*radius,y=pitY+Math.sin(angle)*radius;
      const z=sign*(j<=inner ? pitRadius*.89*Math.cos(j/inner*Math.PI/2) : 0);
      p.push(x,y,z);uv.push(x/2.2+.5,y/3.3+.5);
      const phi=Math.acos(THREE.MathUtils.clamp(y/height,-1,1));
      const edgeDistance=Math.max(0,Math.min(profile(phi)-Math.abs(x-center(phi)),(height-Math.abs(y))*.6));
      const color=yellow.clone().lerp(green,Math.exp(-edgeDistance*4.5));
      color.lerp(edgeColor,Math.exp(-edgeDistance*130));
      // Soft contact shading follows the actual concavity, not a painted hole.
      const cavity=j<inner ? .76+.24*Math.sin(j/inner*Math.PI/2) : 1;
      color.multiplyScalar(cavity);colors.push(color.r,color.g,color.b);
      if(j<rows&&i<cols){const a=j*(cols+1)+i,b=a+cols+1;idx.push(...(sign>0?[a,a+1,b,b,a+1,b+1]:[a,b,a+1,b,b+1,a+1]));}
    }
    return mesh(p,idx,uv,colors,flesh);
  }
  front.add(shell(1),cut(1));back.add(shell(-1),cut(-1));
  const pit=new THREE.Mesh(new THREE.SphereGeometry(pitRadius,72,48),stone);
  pit.castShadow=true;pit.receiveShadow=true;
  pit.position.set(0,pitY,.015);pit.scale.set(1,1.08,.92);pit.rotation.z=.15;back.add(pit);
  // One stem is attached to the rear half; it is never duplicated by the opening.
  const stem=new THREE.Mesh(new THREE.SphereGeometry(.068,18,12),new THREE.MeshStandardMaterial({map:stoneColor,color:0x6c4828,roughness:1}));
  stem.position.set(0,1.65,-.015);stem.scale.set(1,.52,1);stem.rotation.z=-.2;back.add(stem);
  let lastWidth=0,lastHeight=0,lastSmall=null;
  function render(progress=0, small=false){
    const width=container.clientWidth,h=container.clientHeight;
    if(width!==lastWidth||h!==lastHeight||small!==lastSmall){renderer.setSize(width,h,false);camera.aspect=width/h;camera.position.z=Math.max(7.6,(small?5.25:4.6)/camera.aspect/(2*Math.tan(THREE.MathUtils.degToRad(16.5))));camera.updateProjectionMatrix();lastWidth=width;lastHeight=h;lastSmall=small;}
    const smooth=(a,b,v)=>{const x=THREE.MathUtils.clamp((v-a)/(b-a),0,1);return x*x*(3-2*x);};
    const separate=smooth(.12,.68,progress),turn=smooth(.23,.82,progress);
    front.position.set(-1.25*separate,.10*separate,1.03*Math.sin(separate*Math.PI));
    back.position.set(.83*separate,-.02*separate,-.13*separate);
    front.rotation.set(-.13*turn,-2.22*turn,.12*turn);
    back.rotation.set(-.12*turn,.60*turn,-.10*turn);
    fruit.position.x=.15*separate;
    fruit.rotation.set(.04,-.20*(1-turn),-.17*(1-turn));
    const scale=small?1.05-.12*separate:1.09-.08*separate;
    fruit.scale.setScalar(scale);
    renderer.render(scene,camera);
  }
  render();
  return {render,dispose(){renderer.dispose();environment.dispose();maps.forEach(map=>map.dispose());scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}};
}
