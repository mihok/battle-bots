import '@babel/polyfill';
import * as THREE from 'three';

import { GameObject } from '../engine';

// import TreeLarge from '../meshes/large-tree.json';

const TREE_LARGE = 'tree-large';
const TREE_MEDIUM = 'tree-medium';
const TREE_SMALL = 'tree-small';
const TREE_WIDE = 'tree-wide';

function randomInt(min: number, max: number) {
    const rand = (Math.floor(Math.random()*(max-min+1)+min));
    // const negative = 1; // (Math.floor(Math.random()*2) == 1 ? 1 : -1);
    // console.log("Generating Random Number", rand, negative);
    return rand; // * negative;
}

export class Tree extends GameObject {

    static MaterialPath: string = './src/meshes/pal.png';
    static GeometryPath: string = '';
    // static GeometryVariations: any = {
    //     'large-tree',
    //     '
    // };
    private variant: number

    constructor (options: any = {variant: TREE_LARGE}) {
        super();

        this.object3D = new THREE.Object3D();
        this.variant = options.variant;
    }

    public async init () {
        try {
            const geometry = await this.load();

            const material = new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture(Tree.MaterialPath)
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.castShadow = true;

            this.object3D.add(mesh);
        } catch (error) {
            console.error(error);
        }
    }

    private async load(): Promise<THREE.Geometry> {
        const loader = new THREE.JSONLoader();

        return new Promise<THREE.Geometry>((resolve, reject) => {
            loader.load(
                `./src/meshes/${this.variant}.json`,
                (geometry) => {
                    resolve(geometry);
                },
                (progress) => {
                    console.log('Loading', progress.loaded, '/', progress.total);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // TODO: Figure out how to do this function
    static Factory (): Tree {
        const rand = randomInt(0, 3);
        const variants = [
            TREE_LARGE,
            TREE_MEDIUM,
            TREE_SMALL,
            TREE_WIDE
        ];
        const tree = new Tree({ variant: variants[rand] });

        tree.init();

        tree.object3D.castShadow = true;

        return tree;
    }
}
