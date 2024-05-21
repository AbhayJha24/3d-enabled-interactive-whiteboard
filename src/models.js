import React, {useEffect, useState, useRef} from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gltfScene1 from './3dmodels/p-orbitals-draco.glb'
import gltfScene3 from './3dmodels/dyz-orbital-draco.glb'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import fullscreen from './images/full-screen.png'
import pentool from './images/pen.png'
import erasertool from './images/eraser.png'
import autorotatetool from './images/auto-rotate.png'
import rotatelefttool from './images/left-rotate.png'
import rotaterighttool from './images/right-rotate.png'
import rotateuptool from './images/up-rotate.png'
import rotatedowntool from './images/down-rotate.png'
import './main.css'

const Models = () => {

    const models = useRef()
    const spinner = useRef()
    const featuresModelChanger = useRef()
    const whiteBoard = useRef()
    const colorSwatch = useRef()

    useEffect(() =>{
        if (models.current != null /*&& carouselButton1.current != null && carouselButton2.current != null && carouselButton3.current != null*/) {
          spinner.current.className = "featuresModelLoadingSpinnerHidden";
          // carouselButton1.current.className="carouselButtonsActive"; carouselButton2.current.className="carouselButtons"; carouselButton3.current.className="carouselButtons";
                init1();
        }
      }, [])

      window.addEventListener('resize', () => {
        window.location.reload()
      })
      

      let penColor = "#000000"
      let currentModel = "P Orbital"

      function clearScene(obj) {
        while(obj.children.length > 0){ 
            clearScene(obj.children[0]);
            obj.remove(obj.children[0]);
        }
        if(obj.geometry) obj.geometry.dispose();
      
        if(obj.material) { 
            if (obj.material.length) {
                for (let i = 0; i < obj.material.length; ++i) {
                    obj.material[i].dispose()                             
                }
            }
            obj.material.dispose()                     
        }
      }
      
      let renderer
      let scene1, camera1, controls1;
      let scene3, camera3, controls3;
  
      function toggleAutoRotate() {
        if (currentModel === "P Orbital") {
          if (controls1) {
            controls1.autoRotate = !(controls1.autoRotate) 
          } 
        }

        else if (currentModel === "D XYZ Orbitals") {
          if (controls3) {
            controls3.autoRotate = !(controls3.autoRotate) 
          }
        }
      }
  
      function rotateLeft() {
        if (scene3) {
          scene3.children[3].rotation.y += 1
        }
  
        else if (scene1) {
          scene1.children[3].rotation.y += 1
        }
      }
      
      function rotateRight() {
        if (scene3) {
          scene3.children[3].rotation.y -= 1
        }
  
        else if (scene1) {
          scene1.children[3].rotation.y -= 1
        }
      }
      
      function rotateTop() {
        if (scene3) {
          // scene3.children[3].rotation.x = 90
          // scene3.children[3].rotation.z = 90
        }
      }
      
      function rotateFront() {
        if (scene3) {
          scene3.children[3].rotation.x += 1
          // scene3.children[3].rotation.z += 1
        }
  
        else if (scene1) {
          scene1.children[3].rotation.x += 1
          // scene1.children[3].rotation.z += 1
        }
      }
      
      function rotateBack() {
        if (scene3) {
          scene3.children[3].rotation.x -= 1
          // scene3.children[3].rotation.z -= 1
        }
  
        else if (scene1) {
          scene1.children[3].rotation.x -= 1
          // scene1.children[3].rotation.z -= 1
        }
      }
      
      function init1() {
        
        if (renderer) {
          renderer.dispose()
        }
        if(scene1){clearScene(scene1)}
        if(scene3){clearScene(scene3)}
        if(controls1){controls1.dispose()}
        if(controls3){controls3.dispose()}
        var s = models.current;
        scene1 = new THREE.Scene();
        camera1 = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,50);
        camera1.position.set(4,1,4);
        let directionalLight = new THREE.DirectionalLight(0xffffff,2);
        directionalLight.position.set(1,3,1);
        directionalLight.castShadow = true;
        let directionalLight1 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight1.position.set(-1,3,-1);
        directionalLight1.castShadow = true;
        let directionalLight2 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight2.position.set(1,-3,1);
        directionalLight2.castShadow = true;
        scene1.add(directionalLight);
        scene1.add(directionalLight1);
        scene1.add(directionalLight2);
        renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        // renderer.setPixelRatio(1.77778)
        renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
        while (s.lastChild) {
          s.removeChild(s.lastChild);
        }
        s.appendChild(renderer.domElement);
        controls1 = new OrbitControls(camera1,renderer.domElement);
        controls1.target.set(0,0,0)
        // controls1.autoRotate = true;
        controls1.maxDistance = 5;
        controls1.minDistance = 2;
        controls1.enableDamping = true;
        controls1.enablePan = false;
        controls1.enableZoom = false;
        let loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader()
        // dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        loader.setDRACOLoader(dracoLoader);
        loader.load(gltfScene1, gltf =>{
          spinner.current.className = "featuresModelLoadingSpinnerHidden";
          let obj = gltf.scene.children[0];
          obj.scale.set(0.02,0.02,0.02);
          obj.position.set(0,0,0);
          scene1.add(gltf.scene);
          scene1.background = new THREE.Color( 0xcfd6e4 );
        }, xhr =>{
          spinner.current.className = "featuresModelLoadingSpinner";
          // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        });
        anim1();
      }
      function anim1(){
          controls1.update();
          requestAnimationFrame(anim1);
          renderer.render(scene1,camera1);
      }
      
      function init3() {
      
        if (renderer) {
          renderer.dispose()
        }
        if(scene1){clearScene(scene1)}
        if(scene3){clearScene(scene3)}
        if(controls1){controls1.dispose()}
        if(controls3){controls3.dispose()}
      
        var s = models.current;
        scene3 = new THREE.Scene();
        camera3 = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,100);
        camera3.rotation.x = 60/180*Math.PI;
        camera3.position.x = 10;
        camera3.position.y = 10;
        camera3.position.z = 10;
        let directionalLight = new THREE.DirectionalLight(0xffffff,2);
        directionalLight.position.set(4,1,4);
        directionalLight.castShadow = true;
        let directionalLight1 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight1.position.set(-1,3,-1);
        directionalLight1.castShadow = true;
        let directionalLight2 = new THREE.DirectionalLight(0xffffff,2);
        directionalLight2.position.set(1,-3,1);
        directionalLight2.castShadow = true;
        scene3.add(directionalLight);
        scene3.add(directionalLight1);
        scene3.add(directionalLight2);
        renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
        while (s.lastChild) {
          s.removeChild(s.lastChild);
        }
        s.appendChild(renderer.domElement);
        controls3 = new OrbitControls(camera3,renderer.domElement);
        controls3.target.set(0,0,0)
        // controls3.autoRotate = true;
        controls3.maxDistance = 15;
        controls3.minDistance = 10;
        controls3.enableDamping = true;
        controls3.enablePan = false;
        controls3.enableZoom = false;
        let loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        loader.setDRACOLoader(dracoLoader);
        loader.load(gltfScene3, gltf =>{
          spinner.current.className = "featuresModelLoadingSpinnerHidden"
          let obj = gltf.scene.children[0];
          obj.position.set(0,-1,0);
          obj.scale.set(0.13,0.13,0.13);
          controls3.update()
          scene3.add(gltf.scene);
          scene3.background = new THREE.Color( 0xcfd6e4 );
        }, xhr =>{
          spinner.current.className = "featuresModelLoadingSpinner"
              // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          });
        anim3();
      }
      function anim3(){
          controls3.update();
          requestAnimationFrame(anim3);
          renderer.render(scene3,camera3);
      }
  
    function changeModel() {
      if (featuresModelChanger.current !== null) {
        if (featuresModelChanger.current.className === "featuresModelChangerClosed") {
          featuresModelChanger.current.className = "featuresModelChangerOpen"
        }
        else{
          featuresModelChanger.current.className = "featuresModelChangerClosed"
        }
    }
    }

    async function toggleFullScreen() {
      if (document.fullscreenElement == null) {
        await document.documentElement.requestFullscreen().catch(e => {
          console.log(e)
        })
      }
      else{
        await document.exitFullscreen().catch(e => {
          console.log(e)
        })
      }
    }

    function setCurrentModel(currModel) {
      currentModel = currModel
    }

    function toggleWhiteBoard () {
        if (whiteBoard) {
          whiteBoard.current.height = window.innerHeight
          whiteBoard.current.width = window.innerWidth
          whiteBoard.current.className = whiteBoard.current.className==="whiteBoard" ? "whiteBoardFalse" : "whiteBoard"
        }
      }
    
      let painting = false
      let context = whiteBoard.current ? whiteBoard.current.getContext("2d") : null
    
      // Drawing Logic
    
      function startPosition (e) {
        painting = true
        if(whiteBoard && !context) {context = whiteBoard.current.getContext("2d")}
        if(context){
          context.lineWidth = 2
          context.strokeStyle = penColor
          if (penColor === "#ffffff00") {
            context.globalCompositeOperation = "source-out"
          }
          else{
            context.globalCompositeOperation = "source-over"
          }
          context.strokeLinecap = 'round'
          context.beginPath()
          context.moveTo(e.clientX, e.clientY)
        }
    }
      
      function endPosition () {
        painting = false
    
      }
    
      function draw (e) {
        if (!painting) {
          return
        }
        else{
            if(whiteBoard && !context) {context = whiteBoard.current.getContext("2d")}
            if(context){
            context.lineTo(e.clientX, e.clientY)
            context.stroke()
            }
      }
    }

    function eraser() {
      if(penColor === "#ffffff00"){
        penColor = colorSwatch.current.value
      }
      else{
        penColor = "#ffffff00"
      }
    }
    
      // Mouse Event Listeners
    
      useEffect(() => {
        if(whiteBoard.current){
          whiteBoard.current.addEventListener('mousedown', startPosition)
          whiteBoard.current.addEventListener('mouseup', endPosition)
          whiteBoard.current.addEventListener('mousemove', draw)
        }
      },[])

  return (
      <>
        <div ref={spinner}></div>
        <div className="featuresModelChangerClosed" ref={featuresModelChanger} onClick={changeModel}>
          <div className="featuresCurrentModel">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 172 172" className="featuresModelChangeButton"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M17.2,27.52c-2.48118,-0.03509 -4.78904,1.2685 -6.03987,3.41161c-1.25083,2.1431 -1.25083,4.79369 0,6.93679c1.25083,2.1431 3.55869,3.4467 6.03987,3.41161h137.6c2.48118,0.03509 4.78904,-1.2685 6.03987,-3.41161c1.25083,-2.1431 1.25083,-4.79369 0,-6.93679c-1.25083,-2.1431 -3.55869,-3.4467 -6.03987,-3.41161zM17.2,79.12c-2.48118,-0.03509 -4.78904,1.2685 -6.03987,3.41161c-1.25083,2.1431 -1.25083,4.79369 0,6.93679c1.25083,2.1431 3.55869,3.4467 6.03987,3.41161h137.6c2.48118,0.03509 4.78904,-1.2685 6.03987,-3.41161c1.25083,-2.1431 1.25083,-4.79369 0,-6.93679c-1.25083,-2.1431 -3.55869,-3.4467 -6.03987,-3.41161zM17.2,130.72c-2.48118,-0.03509 -4.78904,1.2685 -6.03987,3.41161c-1.25083,2.1431 -1.25083,4.79369 0,6.93679c1.25083,2.1431 3.55869,3.4467 6.03987,3.41161h137.6c2.48118,0.03509 4.78904,-1.2685 6.03987,-3.41161c1.25083,-2.1431 1.25083,-4.79369 0,-6.93679c-1.25083,-2.1431 -3.55869,-3.4467 -6.03987,-3.41161z"></path></g></g></svg>
          <p className="featuresModelNames">3D Models</p>
          </div>
          <div className="featuresCurrentModel">
            <div className="featuresGreenButton"></div>
            <p className="featuresModelNames" onClick={e => {setCurrentModel("D XYZ Orbitals"); init3()}}>D xyz Orbitals</p>
          </div>
          <div className="featuresCurrentModel">
            <div className="featuresGreenButton"></div>
            <p className="featuresModelNames" onClick={e => {setCurrentModel("P Orbital"); init1()}}>P Orbitals</p>
          </div>
        </div>
        <div className="fullScreenButton" onClick={toggleFullScreen}><img src={fullscreen} className="featuresRotateIcon"/></div>
        <img src={autorotatetool} className="autoRotateButton" onClick={toggleAutoRotate} />
        <img src={pentool} className="drawButton" onClick={toggleWhiteBoard} />
        <img src={erasertool} className="eraseButton" onClick={eraser} />
        <input type="color" className="colorChangeButton" ref={colorSwatch} onChange={() =>{penColor = colorSwatch.current.value}} />
        {/* <div className="colorChangeButtonBlue" onClick={() => {penColor = "#0000ff"}}></div>
        <div className="colorChangeButtonGreen" onClick={() => {penColor = "#00ff00"}}></div>
        <div className="colorChangeButtonRed" onClick={() => {penColor = "#ff0000"}}></div>
        <div className="colorChangeButtonYellow" onClick={() => {penColor = "#ffff00"}}></div> */}
        <div className="topBottomLeftRightButtons">
          <img src={rotateuptool} className="frontButton" onClick={rotateFront} />
          {/* <div className="leftRightButtons"> */}
          <img src={rotatelefttool} className="leftButton" onClick={rotateLeft} />
          {/* <div className="topButton" onClick={rotateTop}></div> */}
          <img src={rotaterighttool} className="rightButton" onClick={rotateRight} />
          {/* </div> */}
          <img src={rotatedowntool} className="bottomButton" onClick={rotateBack} />
        </div>
          <div className="featuresModel" ref={models}></div>
          <canvas className="whiteBoardFalse" ref={whiteBoard}></canvas>
          <div className="button3d">3D</div>
      </>
  );
};

export default Models
