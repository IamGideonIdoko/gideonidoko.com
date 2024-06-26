import * as THREE from 'three';
import GooeyImage from './GooeyImage';

const perspective = 800;

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private imageWrappers: NodeListOf<HTMLElement>;
  private W: number;
  private H: number;
  private scene?: THREE.Scene;
  private renderer?: THREE.WebGLRenderer;
  private gooeyImages?: GooeyImage[];
  private camera?: THREE.PerspectiveCamera;
  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.imageWrappers = document.querySelectorAll<HTMLElement>('.gooey__image');

    this.W = window.innerWidth;
    this.H = window.innerHeight;

    this.start();

    this.bindEvent();
  }

  private bindEvent() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  private start() {
    this.scene = new THREE.Scene();
    this.initCamera();
    this.initLights();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(this.W, this.H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.gooeyImages = Array.from(this.imageWrappers).map((item) => {
      return new GooeyImage(item, 0.5, (mesh) => {
        if (this.scene) {
          this.scene.add(mesh);
        }
      });
    });

    this.update();
  }

  private initCamera() {
    const fov = (180 * (2 * Math.atan(this.H / 2 / perspective))) / Math.PI;

    this.camera = new THREE.PerspectiveCamera(fov, this.W / this.H, 1, 10000);
    this.camera.position.set(0, 0, perspective);
    this.scene?.add(this.camera);
  }

  private initLights() {
    const ambientlight = new THREE.AmbientLight(0xffffff, 2);
    if (this.scene) this.scene.add(ambientlight);
  }

  /* Handlers
    --------------------------------------------------------- */

  private onResize() {
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    if (this.camera) {
      // this.camera.aspect = this.W / this.H;
      // this.camera.updateProjectionMatrix();
      // Updating the projection matrix deosn't work for now (for some weird reasons)
      this.scene?.remove(this.camera);
      this.initCamera();
    }
    if (this.renderer) {
      this.renderer.setSize(this.W, this.H);
      // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    }
  }

  /* Actions
    --------------------------------------------------------- */

  private update() {
    requestAnimationFrame(this.update.bind(this));
    if (this.gooeyImages)
      this.gooeyImages.forEach((gooeyImage) => {
        gooeyImage.update();
      });
    if (this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera);
  }

  // clean up the canvas
  public cleanUp() {
    if (this.gooeyImages)
      this.gooeyImages.forEach((gooeyImage) => {
        gooeyImage.material?.dispose();
        gooeyImage.geometry?.dispose();
        if (gooeyImage.mesh) {
          this.scene?.remove(gooeyImage.mesh);
        }
      });
    this.renderer?.dispose();
  }
}
