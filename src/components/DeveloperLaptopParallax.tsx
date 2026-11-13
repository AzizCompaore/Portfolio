import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

interface CodeSnippet {
  id: string;
  filename: string;
  lang: string;
  statusText: string;
  lines: string[];
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'portfolio',
    filename: 'Projects.tsx',
    lang: 'TypeScript React',
    statusText: '8 projets · portfolio prêt',
    lines: [
      'import { PROJECTS_DATA } from "../data/portfolioData";',
      'import { ProjectScreenshotSlot } from "./ProjectScreenshotSlot";',
      '',
      'export function Projects() {',
      '  return (',
      '    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">',
      '      {PROJECTS_DATA.map((project) => (',
      '        <article key={project.id}>',
      '          <ProjectScreenshotSlot project={project} />',
      '          <h3>{project.title}</h3>',
      '          <p>{project.tagline}</p>',
      '          <a href={project.url}>Découvrir</a>',
      '        </article>',
      '      ))}',
      '    </div>',
      '  );',
      '}',
    ],
  },
];

export const DeveloperLaptopParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const activeSnippetIdx = 0;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // References for Three.js objects
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    laptopGroup: THREE.Group;
    lidGroup: THREE.Group;
    screenMesh: THREE.Mesh;
    screenTexture: THREE.CanvasTexture;
    screenCanvas: HTMLCanvasElement;
    screenCtx: CanvasRenderingContext2D;
    animationFrameId: number;
    targetRotationY: number;
    currentRotationY: number;
    targetRotationX: number;
    currentRotationX: number;
    targetLidAngle: number;
    currentLidAngle: number;
    targetScale: number;
    currentScale: number;
    targetCameraZ: number;
    currentCameraZ: number;
    targetCameraY: number;
    currentCameraY: number;
    targetLookAtY: number;
    currentLookAtY: number;
  } | null>(null);

  // Draws a compact, syntax-highlighted editor preview on the laptop display.
  const drawCodeOnScreen = (snippetIndex: number, showCursor: boolean = true) => {
    if (!threeRef.current) return;
    const { screenCanvas, screenCtx, screenTexture } = threeRef.current;
    const snippet = CODE_SNIPPETS[snippetIndex];

    const W = screenCanvas.width;
    const H = screenCanvas.height;

    const activityBarW = 64;
    const explorerW = 270;
    const editorX = activityBarW + explorerW;
    const codeX = editorX + 92;
    const minimapW = 74;
    const activeLineIdx = 3;

    screenCtx.fillStyle = '#10131a';
    screenCtx.fillRect(0, 0, W, H);

    screenCtx.fillStyle = '#191c24';
    screenCtx.fillRect(0, 0, W, 62);
    screenCtx.fillStyle = '#292d38';
    screenCtx.fillRect(0, 61, W, 1);
    ['#f07178', '#e6b866', '#8ccf7e'].forEach((color, index) => {
      screenCtx.fillStyle = color;
      screenCtx.beginPath();
      screenCtx.arc(30 + index * 26, 31, 8, 0, Math.PI * 2);
      screenCtx.fill();
    });
    screenCtx.textAlign = 'center';
    screenCtx.fillStyle = '#c5cad5';
    screenCtx.font = '500 19px "JetBrains Mono", "Fira Code", monospace';
    screenCtx.fillText('aziz-portfolio  ·  Projects.tsx', W / 2, 38);
    screenCtx.textAlign = 'left';
    screenCtx.fillStyle = '#a1a8b7';
    screenCtx.font = '16px "JetBrains Mono", monospace';
    screenCtx.fillText('TypeScript  React', W - 230, 38);

    screenCtx.fillStyle = '#151820';
    screenCtx.fillRect(0, 62, activityBarW, H - 104);
    screenCtx.fillStyle = '#e6b866';
    screenCtx.fillRect(0, 84, 4, 48);
    screenCtx.font = '24px sans-serif';
    screenCtx.fillText('◈', 20, 116);
    screenCtx.fillStyle = '#82899a';
    screenCtx.fillText('⌕', 20, 170);
    screenCtx.fillText('⑂', 20, 224);
    screenCtx.fillText('▧', 20, 278);
    screenCtx.fillText('⚙', 20, H - 126);

    screenCtx.fillStyle = '#191c25';
    screenCtx.fillRect(activityBarW, 62, explorerW, H - 104);
    screenCtx.fillStyle = '#c6cbd6';
    screenCtx.font = '600 16px "JetBrains Mono", monospace';
    screenCtx.fillText('EXPLORER', activityBarW + 22, 98);
    screenCtx.fillStyle = '#abb2c0';
    screenCtx.font = '18px "JetBrains Mono", monospace';
    screenCtx.fillText('⌄  AZIZ-PORTFOLIO', activityBarW + 22, 146);
    screenCtx.fillStyle = '#e6b866';
    screenCtx.fillText('⌄  src', activityBarW + 40, 190);
    ['App.tsx', 'Projects.tsx', 'portfolioData.ts', 'index.css'].forEach((file, index) => {
      if (index === 1) {
        screenCtx.fillStyle = '#292d38';
        screenCtx.fillRect(activityBarW + 30, 204 + index * 43, explorerW - 30, 40);
      }
      screenCtx.fillStyle = index === 1 ? '#f0c674' : '#aeb5c3';
      screenCtx.fillText(`▣  ${file}`, activityBarW + 56, 231 + index * 43);
    });

    screenCtx.fillStyle = '#2c303b';
    screenCtx.fillRect(editorX - 1, 62, 1, H - 104);
    screenCtx.fillStyle = '#1b1e27';
    screenCtx.fillRect(editorX, 62, W - editorX, 54);
    screenCtx.fillStyle = '#252934';
    screenCtx.fillRect(editorX, 62, 340, 54);
    screenCtx.fillStyle = '#78a9ff';
    screenCtx.font = 'bold 17px "JetBrains Mono", monospace';
    screenCtx.fillText('TS', editorX + 20, 96);
    screenCtx.fillStyle = '#e2e5eb';
    screenCtx.font = '18px "JetBrains Mono", monospace';
    screenCtx.fillText(snippet.filename, editorX + 58, 96);
    screenCtx.fillStyle = '#8b92a1';
    screenCtx.fillText('×', editorX + 300, 96);
    screenCtx.fillStyle = '#1a1d26';
    screenCtx.fillRect(editorX, 116, W - editorX, 42);
    screenCtx.font = '16px "JetBrains Mono", monospace';
    screenCtx.fillStyle = '#8b92a1';
    screenCtx.fillText('src  ›  components  ›', editorX + 28, 143);
    screenCtx.fillStyle = '#e0b56d';
    screenCtx.fillText(snippet.filename, editorX + 300, 143);

    const codeTop = 188;
    const lineHeight = 42;
    const codeBottom = H - 52;
    const codeWidth = W - codeX - minimapW - 18;
    screenCtx.fillStyle = '#11141b';
    screenCtx.fillRect(editorX, 158, W - editorX, H - 210);
    screenCtx.fillStyle = '#14171f';
    screenCtx.fillRect(editorX, 158, 70, H - 210);
    screenCtx.fillStyle = '#242833';
    screenCtx.fillRect(codeX - 15, 158, 1, H - 210);

    snippet.lines.forEach((lineText, idx) => {
      const y = codeTop + idx * lineHeight;
      if (y > codeBottom) return;

      if (idx === activeLineIdx) {
        screenCtx.fillStyle = '#1c202a';
        screenCtx.fillRect(editorX + 1, y - 30, W - editorX - minimapW - 1, lineHeight);
        screenCtx.fillStyle = '#e6b866';
        screenCtx.fillRect(editorX, y - 30, 3, lineHeight);
      }

      screenCtx.fillStyle = idx === activeLineIdx ? '#e6b866' : '#777f90';
      screenCtx.font = '18px "JetBrains Mono", monospace';
      screenCtx.fillText(String(idx + 1).padStart(2, '0'), editorX + 24, y);

      screenCtx.font = '500 26px "JetBrains Mono", "Fira Code", monospace';
      let currentX = codeX + (lineText.length - lineText.trimStart().length) * 14;
      const tokens = lineText.trimStart().match(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\b(?:import|from|export|function|return|const|map)\b|\b[A-Z][\w]*\b|\b\d+\b|[{}()[\].,:;=<>/]|[\w$-]+|\s+|.)/g) ?? [];
      tokens.forEach((token) => {
        if (currentX > codeX + codeWidth) return;
        if (/^["'`]/.test(token)) {
          screenCtx.fillStyle = '#a8c98a';
        } else if (/^(import|from|export|function|return|const|map)$/.test(token)) {
          screenCtx.fillStyle = '#c792ea';
        } else if (/^[A-Z]/.test(token)) {
          screenCtx.fillStyle = '#82aaff';
        } else if (/^(className|project|PROJECTS_DATA|key|src|alt|href|categoryLabel|title|tagline|url)$/.test(token)) {
          screenCtx.fillStyle = '#e6b866';
        } else if (/^[{}()[\].,:;=<>/]$/.test(token)) {
          screenCtx.fillStyle = '#9ba4b5';
        } else {
          screenCtx.fillStyle = '#d7dae0';
        }
        screenCtx.fillText(token, currentX, y, codeX + codeWidth - currentX);
        currentX += screenCtx.measureText(token).width;
      });

      if (idx === activeLineIdx && showCursor) {
        screenCtx.fillStyle = '#e6b866';
        screenCtx.fillRect(currentX + 5, y - 22, 3, 28);
      }
    });

    screenCtx.fillStyle = '#151820';
    screenCtx.fillRect(W - minimapW, 158, minimapW, H - 210);
    snippet.lines.forEach((line, index) => {
      const y = 178 + index * 13;
      if (y > codeBottom) return;
      screenCtx.fillStyle = index === activeLineIdx ? '#e6b866' : '#343947';
      screenCtx.fillRect(W - minimapW + 12, y, Math.min(42, Math.max(8, line.length * 2)), 5);
    });
    screenCtx.fillStyle = '#b28b4d';
    screenCtx.fillRect(W - minimapW - 2, 196, 4, 132);

    screenCtx.fillStyle = '#242833';
    screenCtx.fillRect(0, H - 42, W, 42);
    screenCtx.fillStyle = '#e6b866';
    screenCtx.font = '17px "JetBrains Mono", monospace';
    screenCtx.fillText('⎇  main', 22, H - 15);
    screenCtx.fillStyle = '#9ba4b5';
    screenCtx.fillText('TypeScript React', 170, H - 15);
    screenCtx.fillStyle = '#a8c98a';
    screenCtx.fillText('✓  0 erreurs', W - 360, H - 15);
    screenCtx.fillStyle = '#c5cad5';
    screenCtx.textAlign = 'right';
    screenCtx.fillText(snippet.statusText, W - 24, H - 15);
    screenCtx.textAlign = 'left';

    screenTexture.needsUpdate = true;
  };

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 7.6);
    camera.lookAt(0, -0.2, 0);

    // 2. Renderer with Antialias and Soft Shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0); // Transparent to blend seamlessly into warm cream theme!
    mount.appendChild(renderer.domElement);

    // 3. Lighting (Warm studio key light + cool specular rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const goldFillLight = new THREE.DirectionalLight(0xfff8ef, 0.8);
    goldFillLight.position.set(-6, 4, 4);
    scene.add(goldFillLight);

    const rimLight = new THREE.DirectionalLight(0xe7e5e4, 1.2);
    rimLight.position.set(0, -4, -6);
    scene.add(rimLight);

    const displayGlow = new THREE.PointLight(0xffe6c6, 1.1, 4.5);
    displayGlow.position.set(0, 1.5, 1.2);
    scene.add(displayGlow);

    // 4. Build 3D Ultra-Realistic Developer Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -0.2, 0);
    scene.add(laptopGroup);

    // Laptop Dimensions (Apple 16" MacBook Pro proportions)
    const baseW = 4.6;
    const baseH = 0.13;
    const baseD = 3.1;

    // Materials with enhanced photorealism
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x343943,
      metalness: 0.82,
      roughness: 0.26,
    });

    const chamferTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xb5bdcc,
      metalness: 0.9,
      roughness: 0.19,
    });

    const darkAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e1014,
      metalness: 0.7,
      roughness: 0.4,
    });

    const keyMaterial = new THREE.MeshStandardMaterial({
      color: 0x242832,
      metalness: 0.24,
      roughness: 0.42,
    });

    const keyGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd580, // Warm amber underglow backlight
      transparent: true,
      opacity: 0.35,
    });

    // A. Base Chassis (Bottom body)
    const baseGeo = new RoundedBoxGeometry(baseW, baseH, baseD, 3, 0.085);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMaterial);
    baseMesh.position.y = -baseH / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    laptopGroup.add(baseMesh);

    // Polished chamfer perimeter edge on base
    const baseRimGeo = new RoundedBoxGeometry(baseW + 0.015, 0.018, baseD + 0.015, 3, 0.09);
    const baseRimMesh = new THREE.Mesh(baseRimGeo, chamferTrimMaterial);
    baseRimMesh.position.y = 0.005;
    laptopGroup.add(baseRimMesh);

    // 4 Non-slip rubber feet on bottom chassis corners
    const footGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16);
    const footMat = new THREE.MeshStandardMaterial({ color: 0x0a0b0d, roughness: 0.9, metalness: 0.1 });
    const footOffsets = [
      [-baseW / 2 + 0.35, -baseD / 2 + 0.35],
      [baseW / 2 - 0.35, -baseD / 2 + 0.35],
      [-baseW / 2 + 0.35, baseD / 2 - 0.35],
      [baseW / 2 - 0.35, baseD / 2 - 0.35],
    ];
    footOffsets.forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, -baseH - 0.015, fz);
      laptopGroup.add(foot);
    });

    // Front thumb indent notch with smooth bevel
    const notchGeo = new THREE.BoxGeometry(0.85, 0.045, 0.09);
    const notchMesh = new THREE.Mesh(notchGeo, darkAccentMaterial);
    notchMesh.position.set(0, 0.02, baseD / 2);
    laptopGroup.add(notchMesh);

    // Left Side Ports: MagSafe 3 with amber LED + 2 Thunderbolt 4 ports
    const magSafeGeo = new THREE.BoxGeometry(0.06, 0.035, 0.16);
    const portMat = new THREE.MeshStandardMaterial({ color: 0x0a0b0d, metalness: 0.85, roughness: 0.25 });
    const magSafe = new THREE.Mesh(magSafeGeo, portMat);
    magSafe.position.set(-baseW / 2 - 0.01, -0.04, -0.9);
    laptopGroup.add(magSafe);

    // MagSafe glowing charging LED
    const magSafeLedGeo = new THREE.CircleGeometry(0.015, 12);
    const magSafeLedMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const magSafeLed = new THREE.Mesh(magSafeLedGeo, magSafeLedMat);
    magSafeLed.rotation.y = -Math.PI / 2;
    magSafeLed.position.set(-baseW / 2 - 0.015, -0.04, -0.9);
    laptopGroup.add(magSafeLed);

    // Dual Thunderbolt USB-C ports (Left)
    const portGeo = new THREE.BoxGeometry(0.06, 0.03, 0.1);
    const port1 = new THREE.Mesh(portGeo, portMat);
    port1.position.set(-baseW / 2 - 0.01, -0.04, -0.6);
    laptopGroup.add(port1);

    const port2 = new THREE.Mesh(portGeo, portMat);
    port2.position.set(-baseW / 2 - 0.01, -0.04, -0.35);
    laptopGroup.add(port2);

    // Right Side Ports: HDMI + SDXC slot + 3.5mm Jack
    const hdmiGeo = new THREE.BoxGeometry(0.06, 0.035, 0.22);
    const hdmi = new THREE.Mesh(hdmiGeo, portMat);
    hdmi.position.set(baseW / 2 + 0.01, -0.04, -0.85);
    laptopGroup.add(hdmi);

    const sdGeo = new THREE.BoxGeometry(0.06, 0.02, 0.3);
    const sdSlot = new THREE.Mesh(sdGeo, portMat);
    sdSlot.position.set(baseW / 2 + 0.01, -0.04, -0.45);
    laptopGroup.add(sdSlot);

    const jackGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.06, 16);
    const jackMesh = new THREE.Mesh(jackGeo, portMat);
    jackMesh.rotation.z = Math.PI / 2;
    jackMesh.position.set(baseW / 2 + 0.01, -0.04, -0.15);
    laptopGroup.add(jackMesh);

    // Dual Micro-perforated Speaker Grilles on flanks
    const speakerGeo = new THREE.PlaneGeometry(0.26, 1.6);
    const speakerMat = new THREE.MeshStandardMaterial({
      color: 0x121418,
      metalness: 0.85,
      roughness: 0.65,
    });
    const speakerLeft = new THREE.Mesh(speakerGeo, speakerMat);
    speakerLeft.rotation.x = -Math.PI / 2;
    speakerLeft.position.set(-2.05, 0.01, -0.35);
    laptopGroup.add(speakerLeft);

    const speakerRight = new THREE.Mesh(speakerGeo, speakerMat);
    speakerRight.rotation.x = -Math.PI / 2;
    speakerRight.position.set(2.05, 0.01, -0.35);
    laptopGroup.add(speakerRight);

    // B. Keyboard Well (Recessed tray)
    const kbWellGeo = new RoundedBoxGeometry(3.72, 0.025, 1.68, 3, 0.055);
    const kbWellMesh = new THREE.Mesh(kbWellGeo, darkAccentMaterial);
    kbWellMesh.position.set(0, 0.005, -0.35);
    laptopGroup.add(kbWellMesh);

    // Subtle keyboard backlit glow underneath
    const kbBacklightGeo = new THREE.PlaneGeometry(3.72, 1.7);
    const kbBacklightMesh = new THREE.Mesh(kbBacklightGeo, keyGlowMaterial);
    kbBacklightMesh.rotation.x = -Math.PI / 2;
    kbBacklightMesh.position.set(0, 0.008, -0.35);
    laptopGroup.add(kbBacklightMesh);

    // Chiclet Keycaps Grid with Individual Chamfers
    const rows = 5;
    const cols = 14;
    const keyW = 0.23;
    const keyH = 0.045;
    const keyD = 0.25;
    const spacingX = 0.26;
    const spacingZ = 0.30;

    const startX = -((cols - 1) * spacingX) / 2;
    const startZ = -0.35 - ((rows - 1) * spacingZ) / 2;
    const keyGeo = new RoundedBoxGeometry(keyW, keyH, keyD, 2, 0.018);
    const spaceGeo = new RoundedBoxGeometry(spacingX * 6 - 0.05, keyH, keyD, 3, 0.018);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Spacebar on bottom row center
        if (r === rows - 1 && c >= 4 && c <= 9) {
          if (c === 4) {
            const spaceMesh = new THREE.Mesh(spaceGeo, keyMaterial);
            spaceMesh.position.set(0, 0.025, startZ + r * spacingZ);
            laptopGroup.add(spaceMesh);
          }
          continue;
        }

        // Touch ID / Power button in top-right with polished ring
        if (r === 0 && c === cols - 1) {
          const touchIdGeo = new THREE.CylinderGeometry(0.095, 0.095, keyH, 24);
          const touchIdMat = new THREE.MeshStandardMaterial({ color: 0x1b1d24, metalness: 0.95, roughness: 0.1 });
          const touchIdMesh = new THREE.Mesh(touchIdGeo, touchIdMat);
          touchIdMesh.position.set(startX + c * spacingX, 0.025, startZ + r * spacingZ);
          laptopGroup.add(touchIdMesh);

          const ringGeo = new THREE.TorusGeometry(0.098, 0.008, 12, 24);
          const ringMesh = new THREE.Mesh(ringGeo, chamferTrimMaterial);
          ringMesh.rotation.x = Math.PI / 2;
          ringMesh.position.set(startX + c * spacingX, 0.035, startZ + r * spacingZ);
          laptopGroup.add(ringMesh);
          continue;
        }

        const singleKeyMesh = new THREE.Mesh(keyGeo, keyMaterial);
        singleKeyMesh.position.set(startX + c * spacingX, 0.025, startZ + r * spacingZ);
        laptopGroup.add(singleKeyMesh);
      }
    }

    const keyLegendCanvas = document.createElement('canvas');
    keyLegendCanvas.width = 1120;
    keyLegendCanvas.height = 500;
    const keyLegendCtx = keyLegendCanvas.getContext('2d')!;
    keyLegendCtx.font = '600 23px Arial, sans-serif';
    keyLegendCtx.textAlign = 'center';
    keyLegendCtx.textBaseline = 'middle';
    keyLegendCtx.fillStyle = 'rgba(224, 229, 239, 0.82)';
    const keyRows = ['1234567890-=', 'QWERTYUIOP[]', "ASDFGHJKL;'", 'ZXCVBNM,./'];
    keyRows.forEach((row, rowIndex) => {
      [...row].forEach((character, columnIndex) => {
        const rowOffset = rowIndex === 1 ? 0.4 : rowIndex === 2 ? 0.75 : rowIndex === 3 ? 1.4 : 0;
        keyLegendCtx.fillText(
          character,
          (columnIndex + rowOffset + 0.5) * 80,
          (rowIndex + 0.5) * 100,
        );
      });
    });
    const keyLegendTexture = new THREE.CanvasTexture(keyLegendCanvas);
    const keyLegend = new THREE.Mesh(
      new THREE.PlaneGeometry(3.55, 1.5),
      new THREE.MeshBasicMaterial({ map: keyLegendTexture, transparent: true, depthWrite: false }),
    );
    keyLegend.rotation.x = -Math.PI / 2;
    keyLegend.position.set(0, 0.048, -0.35);
    laptopGroup.add(keyLegend);

    // C. Frosted Precision Glass Trackpad
    const trackpadGeo = new RoundedBoxGeometry(1.75, 0.018, 1.15, 4, 0.08);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x22252d,
      metalness: 0.45,
      roughness: 0.14,
    });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.position.set(0, 0.01, 0.88);
    laptopGroup.add(trackpadMesh);

    // Trackpad border outline
    const trackpadBorderGeo = new THREE.EdgesGeometry(trackpadGeo);
    const trackpadBorderMat = new THREE.LineBasicMaterial({ color: 0x474c5d });
    const trackpadBorder = new THREE.LineSegments(trackpadBorderGeo, trackpadBorderMat);
    trackpadBorder.position.set(0, 0.012, 0.88);
    laptopGroup.add(trackpadBorder);

    // D. Display Hinge & Lid (Pivot point at rear edge)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.02, -baseD / 2);
    laptopGroup.add(lidGroup);

    // Cylindrical Hinge with metallic finish and black clutch
    const hingeGeo = new THREE.CylinderGeometry(0.068, 0.068, 4.0, 24);
    const hingeMat = new THREE.MeshStandardMaterial({ color: 0x14161d, metalness: 0.95, roughness: 0.18 });
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.rotation.z = Math.PI / 2;
    lidGroup.add(hingeMesh);

    // Screen Lid Backplate (Aluminum Back)
    const lidThickness = 0.085;
    const lidH = baseD - 0.05;
    const lidBackGeo = new RoundedBoxGeometry(baseW, lidH, lidThickness, 5, 0.11);
    const lidBackMesh = new THREE.Mesh(lidBackGeo, chassisMaterial);
    lidBackMesh.position.set(0, lidH / 2, -lidThickness / 2);
    lidBackMesh.castShadow = true;
    lidGroup.add(lidBackMesh);

    // Polished chamfered perimeter border on the lid
    const lidRimGeo = new RoundedBoxGeometry(baseW + 0.018, lidH + 0.018, 0.014, 5, 0.12);
    const lidRimMesh = new THREE.Mesh(lidRimGeo, chamferTrimMaterial);
    lidRimMesh.position.set(0, lidH / 2, 0.002);
    lidGroup.add(lidRimMesh);

    const displayBezel = new THREE.Mesh(
      new RoundedBoxGeometry(baseW - 0.075, lidH - 0.075, 0.025, 5, 0.105),
      new THREE.MeshStandardMaterial({ color: 0x101217, metalness: 0.24, roughness: 0.3 }),
    );
    displayBezel.position.set(0, lidH / 2, 0.016);
    lidGroup.add(displayBezel);

    // Rear Illuminated Monogram Emblem ("A" for Aziz with soft warm glow)
    const logoPlateGeo = new THREE.CircleGeometry(0.34, 32);
    const logoPlateMat = new THREE.MeshStandardMaterial({
      color: 0xf9a826,
      emissive: 0xf9a826,
      emissiveIntensity: 1.25,
      metalness: 0.95,
      roughness: 0.08,
    });
    const logoPlate = new THREE.Mesh(logoPlateGeo, logoPlateMat);
    logoPlate.position.set(0, lidH / 2, -lidThickness - 0.006);
    logoPlate.rotation.y = Math.PI;
    lidGroup.add(logoPlate);

    // Rear Volumetric Point Light behind the logo
    const rearLogoLight = new THREE.PointLight(0xf9a826, 1.2, 5);
    rearLogoLight.position.set(0, lidH / 2, -lidThickness - 0.4);
    lidGroup.add(rearLogoLight);

    // Center Top Notch (FaceTime HD camera + ambient sensors)
    const notchDisplayGeo = new THREE.BoxGeometry(0.42, 0.07, 0.01);
    const notchDisplayMat = new THREE.MeshBasicMaterial({ color: 0x040507 });
    const notchDisplayMesh = new THREE.Mesh(notchDisplayGeo, notchDisplayMat);
    notchDisplayMesh.position.set(0, lidH - 0.085, 0.016);
    lidGroup.add(notchDisplayMesh);

    // Camera Lens Aperture
    const cameraLensGeo = new THREE.CircleGeometry(0.018, 16);
    const cameraLensMat = new THREE.MeshStandardMaterial({ color: 0x1d3557, metalness: 0.95, roughness: 0.1 });
    const cameraLens = new THREE.Mesh(cameraLensGeo, cameraLensMat);
    cameraLens.position.set(-0.04, lidH - 0.085, 0.018);
    lidGroup.add(cameraLens);

    // Bright Green Active Camera LED Dot
    const ledGeo = new THREE.CircleGeometry(0.012, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0.12, lidH - 0.085, 0.018);
    lidGroup.add(ledMesh);

    // High-Resolution Screen Canvas Texture (1600x1000 for crystal-clear code legibility!)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1600;
    screenCanvas.height = 1000;
    const screenCtx = screenCanvas.getContext('2d')!;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // SCREEN MESH: Uses MeshBasicMaterial with map=screenTexture to guarantee 100% pixel-perfect contrast,
    // rich colors, sharp readable code, with ZERO wash-out or Z-fighting!
    const screenGeo = new THREE.PlaneGeometry(baseW - 0.19, lidH - 0.19);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    // Positioned cleanly at z = 0.014 in front of lid backplate (no Z-fighting!)
    screenMesh.position.set(0, lidH / 2, 0.03);
    lidGroup.add(screenMesh);

    // Ground Soft Shadow Plane underneath the laptop
    const shadowGeo = new THREE.PlaneGeometry(8.0, 6.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const grad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0,0,0,0.65)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.22)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    shadowCtx.fillStyle = grad;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -baseH - 0.04, 0);
    scene.add(shadowMesh);

    // INITIAL STATE: Starts 100% CLOSED (Math.PI / 2), ready to smoothly unfold and rotate on scroll!
    threeRef.current = {
      renderer,
      scene,
      camera,
      laptopGroup,
      lidGroup,
      screenMesh,
      screenTexture,
      screenCanvas,
      screenCtx,
      animationFrameId: 0,
      targetRotationY: 0,
      currentRotationY: 0,
      targetRotationX: 0.25,
      currentRotationX: 0.25,
      // Starts closed flat: Math.PI / 2 folds lid flat over keyboard
      targetLidAngle: Math.PI / 2,
      currentLidAngle: Math.PI / 2,
      targetScale: 0.88,
      currentScale: 0.88,
      targetCameraZ: 7.6,
      currentCameraZ: 7.6,
      targetCameraY: 1.8,
      currentCameraY: 1.8,
      targetLookAtY: -0.2,
      currentLookAtY: -0.2,
    };

    // Draw initial code screen
    drawCodeOnScreen(activeSnippetIdx, true);

    // 5. Animation Loop with smooth Lerp for physics
    let lastBlink = performance.now();
    let cursorVisible = true;
    let isInViewport = false;

    const animate = () => {
      if (!isInViewport) return;
      const state = threeRef.current;
      if (!state) return;

      const now = performance.now();
      if (now - lastBlink > 550) {
        cursorVisible = !cursorVisible;
        lastBlink = now;
        drawCodeOnScreen(activeSnippetIdx, cursorVisible);
      }

      // Smooth interpolation (lerp)
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.08;
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.08;
      state.currentLidAngle += (state.targetLidAngle - state.currentLidAngle) * 0.08;
      state.currentScale += (state.targetScale - state.currentScale) * 0.08;
      state.currentCameraZ += (state.targetCameraZ - state.currentCameraZ) * 0.08;
      state.currentCameraY += (state.targetCameraY - state.currentCameraY) * 0.08;
      state.currentLookAtY += (state.targetLookAtY - state.currentLookAtY) * 0.08;

      // Apply to Three objects
      state.laptopGroup.rotation.y = state.currentRotationY;
      state.laptopGroup.rotation.x = state.currentRotationX;
      state.laptopGroup.scale.setScalar(state.currentScale);
      state.lidGroup.rotation.x = state.currentLidAngle;
      state.camera.position.z = state.currentCameraZ;
      state.camera.position.y = state.currentCameraY;
      state.camera.lookAt(0, state.currentLookAtY, 0);

      state.renderer.render(state.scene, state.camera);
      state.animationFrameId = requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      if (isInViewport) {
        if (threeRef.current?.animationFrameId === 0) animate();
      } else if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animationFrameId);
        threeRef.current.animationFrameId = 0;
      }
    });
    if (containerRef.current) visibilityObserver.observe(containerRef.current);

    // 6. Handle Window Resize
    const handleResize = () => {
      if (!mount || !threeRef.current) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      threeRef.current.camera.aspect = newW / newH;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      visibilityObserver.disconnect();
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animationFrameId);
        threeRef.current.renderer.dispose();
        if (mount.contains(threeRef.current.renderer.domElement)) {
          mount.removeChild(threeRef.current.renderer.domElement);
        }
      }
    };
  }, []);

  // PARALLAX SCROLL CHOREOGRAPHY:
  // "L'ordinateur doit être fermé puis s'ouvrir et tourner sur lui meme au scroll"
  // + "mets du code sur l'écran" (Désormais 100% net, visible et coloré dès que l'écran s'ouvre!)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !threeRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;

      let progress = -rect.top / totalDist;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(Math.round(progress * 100) / 100);

      const state = threeRef.current;

      if (progress < 0.28) {
        const p1 = progress / 0.28;
        state.targetScale = THREE.MathUtils.lerp(0.72, 0.86, p1);
        state.targetLidAngle = THREE.MathUtils.lerp(Math.PI / 2, -0.38, p1);
        state.targetLookAtY = THREE.MathUtils.lerp(-0.2, 1.1, p1);
        state.targetRotationY = THREE.MathUtils.lerp(-0.4, 0.0, p1) + mousePos.x * 0.15;
        state.targetRotationX = THREE.MathUtils.lerp(0.35, 0.14, p1) + mousePos.y * 0.1;
      } else if (progress < 0.72) {
        const p2 = (progress - 0.28) / 0.44;
        state.targetScale = 0.86;
        state.targetLidAngle = -0.38;
        state.targetLookAtY = 1.1;
        state.targetRotationY = Math.sin(p2 * Math.PI * 2) * 0.12 + mousePos.x * 0.12;
        state.targetRotationX = 0.14 + Math.sin(p2 * Math.PI * 2) * 0.025 + mousePos.y * 0.08;
      } else if (progress < 0.86) {
        const p3 = (progress - 0.72) / 0.14;
        state.targetScale = 0.86;
        state.targetLidAngle = -0.38;
        state.targetLookAtY = 1.1;
        state.targetRotationY = p3 * Math.PI * 2;
        state.targetRotationX = 0.14 + Math.sin(p3 * Math.PI * 2) * 0.05 + mousePos.y * 0.08;
      } else {
        const p4 = (progress - 0.86) / 0.14;
        state.targetScale = 0.86;
        state.targetRotationY = Math.PI * 2;
        state.targetLookAtY = 1.1;
        state.targetRotationX = THREE.MathUtils.lerp(0.14, -0.3, p4);
        state.targetLidAngle = -0.38;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mousePos]);

  // Mouse tilt for physical responsiveness
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="workstation"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[200svh] sm:min-h-[220svh] lg:min-h-[250vh] bg-[#FFF8F1] text-[#141416] selection:bg-[#E9E4DB] selection:text-[#141416]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-16 sm:top-[88px] h-[calc(100svh-64px)] sm:h-[calc(100svh-88px)] w-full flex flex-col justify-between overflow-hidden">

        {/* Top Header / Context HUD */}
        <div className="relative z-20 pt-3 sm:pt-7 px-4 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h2 className="text-xl leading-tight sm:text-4xl md:text-5xl font-bold text-[#141416] tracking-tight font-sans">
                Des idées aux solutions concrètes
              </h2>
              <p className="text-sm text-neutral-600 mt-2 max-w-full sm:max-w-xl">
                Je conçois des expériences numériques utiles, du premier échange à la mise en ligne.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Three.js 3D Canvas Mount */}
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(249,168,38,0.12),transparent_42%)]"
          />
          <div ref={canvasMountRef} className="w-full h-full" />
        </div>

        {/* Scroll Progress */}
        <div className="relative z-20 pb-4 sm:pb-8 px-4 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between gap-6 border-t border-black/10 pt-4">
            <span className="hidden sm:block text-xs text-neutral-500">
              Faites défiler pour explorer
            </span>
            <div className="flex flex-1 sm:flex-none sm:w-64 items-center gap-3">
              <div className="flex-1 h-1 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#141416] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-neutral-500 w-10 text-right">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
