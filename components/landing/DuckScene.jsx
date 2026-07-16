import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Duck from './Duck';

function Particles({ count = 220 }) {
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
        }
        return arr;
    }, [count]);

    const ref = useRef(null);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#5eead4"
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                opacity={0.5}
            />
        </Points>
    );
}

function DuckRig({ reducedMotion }) {
    const group = useRef(null);
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (reducedMotion) return undefined;
        const handleMove = (e) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', handleMove);
        return () => window.removeEventListener('pointermove', handleMove);
    }, [reducedMotion]);

    useFrame(() => {
        if (!group.current || reducedMotion) return;
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            pointer.current.x * 0.5,
            0.04,
        );
        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            pointer.current.y * -0.2,
            0.04,
        );
    });

    if (reducedMotion) {
        return (
            <group ref={group} position={[0, 0.1, 0]}>
                <Duck scale={0.85} reducedMotion />
            </group>
        );
    }

    return (
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
            <group ref={group} position={[0, 0.1, 0]}>
                <Duck scale={0.85} />
            </group>
        </Float>
    );
}

function SceneContents({ reducedMotion }) {
    return (
        <>
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 4, 2]} intensity={1.1} color="#5eead4" />
            <pointLight position={[-3, -1, -2]} intensity={0.9} color="#2dd4bf" />
            <DuckRig reducedMotion={reducedMotion} />
            {!reducedMotion && <Particles />}
        </>
    );
}

export default function DuckScene({ reducedMotion = false }) {
    const [frameloop, setFrameloop] = useState('always');

    useEffect(() => {
        const handleVisibility = () => setFrameloop(document.hidden ? 'never' : 'always');
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    return (
        <Canvas
            dpr={[1, 2]}
            frameloop={frameloop}
            camera={{ position: [0, 0.4, 5], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
        >
            <SceneContents reducedMotion={reducedMotion} />
        </Canvas>
    );
}
