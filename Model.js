const scene=new THREE.Scene();
scene.background= new THREE.Color("#282828")
const camera=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,100);
camera.position.setX(20.3737);
camera.position.setY(5.14777);
camera.position.setZ(15.51308);



const renderer=new THREE.WebGLRenderer(
{
    canvas:document.querySelector('#threed'),
 
}
);


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(1000,600);


const hdrloader=new THREE.RGBELoader();
hdrloader.load('./hdr/1.hdr',function(hdrtexture){
    hdrtexture.mapping=THREE.EquirectangularReflectionMapping;

    scene.environment=hdrtexture;
});
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=0.8;
renderer.outputEnding=THREE.sRGBEncoding;


const geometry=new THREE.TorusGeometry(10,3,16,100);

const material=new THREE.MeshStandardMaterial({color:"#EE4646"});

const torus=new THREE.Mesh(geometry,material);




const planegeometry=new THREE.PlaneGeometry(10,10);
const planematerial=new THREE.MeshStandardMaterial({color:"#EE4646"});

const plane=new THREE.Mesh(planegeometry,material);
plane.position.set(-5,-6,-2);
plane.scale.set(6,6);
plane.rotation.x=(-90/180)*Math.PI;

const pointlight1=new THREE.PointLight("#BFA7D0",2,100); // front 
pointlight1.position.set(0,8.78461,15.86959);
const pointlight2=new THREE.PointLight("#BFA7D0",1.8,100); // back
pointlight2.position.set(0,10.78461,-20.86959);
const pointlight3=new THREE.PointLight("#BFA7D0",2.7,100);   // bottom
pointlight3.position.set(0,-40,0);
const pointlight4=new THREE.PointLight("#BFA7D0",1.8,100);   // right
pointlight4.position.set(15,8,0);
const pointlight5=new THREE.PointLight("#BFA7D0",1.8,100);   // left
pointlight5.position.set(-20,5,0);

scene.add(pointlight1,pointlight2,pointlight3,pointlight4,pointlight5);

const lighthelper1=new THREE.PointLightHelper(pointlight1);
const lighthelper2=new THREE.PointLightHelper(pointlight2);
const lighthelper3=new THREE.PointLightHelper(pointlight3);
const lighthelper4=new THREE.PointLightHelper(pointlight4);
const lighthelper5=new THREE.PointLightHelper(pointlight5);



const ambientlight=new THREE.AmbientLight("#9D937B");


const directionallight=new THREE.DirectionalLight(0xffffff,1);
directionallight.position.set(0,0,10);
directionallight.castShadow=true;
scene.add(directionallight);


const controls=new THREE.OrbitControls(camera,renderer.domElement);



function animate()
{
    requestAnimationFrame(animate);



    renderer.render(scene,camera);
}

animate()