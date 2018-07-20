import { AssetsManager, Scene, AbstractMesh, Mesh, InstancedMesh } from "babylonjs";

export class AssetFactory{


    private meshAssets: Map<string,AbstractMesh>;

    public constructor(scene: Scene){
        
        this.meshAssets = new Map<string,AbstractMesh>();
        this.init(scene);
    }

    private init(scene: Scene){
        scene.meshes.forEach((mesh: AbstractMesh) => {
            if(!this.meshAssets.has(mesh.name))
                this.meshAssets.set(mesh.name,mesh);
        });
    }

    public CreateMeshInstance(objectName: string,meshAssetName: string): InstancedMesh | null{
        if(this.meshAssets.has(meshAssetName)){
            let mesh = (this.meshAssets.get(meshAssetName) as Mesh).createInstance(objectName);
            mesh.setEnabled(true);
            return mesh;
        }
        return null;
    }

}