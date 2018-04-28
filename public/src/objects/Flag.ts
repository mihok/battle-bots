import '@babel/polyfill';
import * as THREE from 'three';

import { GameObject } from '../engine';

export class Flag extends GameObject {

    static MeshMaterialPath: string = './src/meshes/world001.png';
    static MeshGeometryPath: string = './src/meshes';

    static MeshGeometryFilenames: string[] = [
        'flag-01',
        'flag-02',
        'flag-03',
        'flag-04',
        'flag-05'
    ];

    private variant: number

    constructor (options: any = {variant: 0}) {
        super();

        this.object3D = new THREE.Object3D();
        this.variant = options.variant;
    }

    public async init () {
        try {
            const geometry = await this.loadGeometry();

            const material = new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture(Flag.MeshMaterialPath)
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.castShadow = true;

            this.object3D.add(mesh);

        } catch (error) {
            console.error(error);
        }
    }
    
    private async loadGeometry(): Promise<THREE.Geometry> {
        const loader = new THREE.JSONLoader();

        return new Promise<THREE.Geometry>((resolve, reject) => {
            loader.load(
                `${Flag.MeshGeometryPath}/${Flag.MeshGeometryFilenames[this.variant]}.json`,
                (geometry) => {
                    resolve(geometry);
                },
                (progress) => {
                    console.log('Loading', progress.loaded, '/', progress.total);
                },
                (error) => {
                    console.error(error);
                    reject(null);
                });
        });
    }

    // private async loadTexture () { }
}
