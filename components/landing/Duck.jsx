import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/assets/duck.glb';

export default function Duck({
    targetHeight = 2.1,
    yaw = -Math.PI / -1,
    scale = 1,
    reducedMotion = false,
    ...groupProps
}) {
    const groupRef = useRef(null);
    const { scene } = useGLTF(MODEL_URL);

    const model = useMemo(() => {
        const clone = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const s = (targetHeight / 4) * (size.y || 1);
        clone.position.set(-center.x * s, -center.y * s, -center.z * s);
        clone.scale.setScalar(s);
        return clone;
    }, [scene, targetHeight]);

    useFrame((state) => {
        if (reducedMotion || !groupRef.current) return;
        groupRef.current.rotation.y = yaw + Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    });

    return (
        <group scale={scale} {...groupProps}>
            <group ref={groupRef} rotation={[0, yaw, 0]}>
                <primitive object={model} />
            </group>
        </group>
    );
}

useGLTF.preload(MODEL_URL);
