import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Terminal, Code2, Cpu, Sparkles, Database, Layers, Download } from 'lucide-react';

interface CodeSnippet {
  id: string;
  filename: string;
  lang: string;
  statusText: string;
  lines: string[];
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'gemini',
    filename: 'agrivigil_engine.py',
    lang: 'Python · Gemini 2.5 Flash',
    statusText: 'Gemini 2.5 Flash · Pipeline multimodal actif (142ms)',
    lines: [
      '# Compaore Abdoul Aziz — AgriVigil AI (Abidjan, CI)',
      'from google.genai import Client',
      'import django',
      'from core.models import DiagnosticCacaoyer',
      '',
      'class CropPathologyDetector:',
      '    """Diagnostic IA en temps réel des cultures ivoiriennes"""',
      '    def __init__(self, region="Abidjan - Côte d\'Ivoire"):',
      '        self.client = Client()',
      '        self.model = "gemini-2.5-flash"',
      '        self.confidence_threshold = 0.965',
      '        self.active_zone = region',
      '',
      '    async def analyze_leaf(self, leaf_telemetry: bytes):',
      '        """Détection des bio-agresseurs du cacaoyer & caféier"""',
      '        prompt = "Identifier la maladie foliaire et prescrire le traitement biologique."',
      '        response = await self.client.models.generate_content(',
      '            model=self.model,',
      '            contents=[leaf_telemetry, prompt],',
      '        )',
      '        return response.parsed_treatment_protocol',
    ],
  },
  {
    id: 'django',
    filename: 'agromarche_views.py',
    lang: 'Django REST · PostgreSQL 16',
    statusText: 'PostgreSQL 16 · Pool de connexion actif (Abidjan)',
    lines: [
      '# AgroMarché — Plateforme e-commerce pour producteurs ivoiriens',
      'from rest_framework import viewsets, permissions',
      'from rest_framework.response import Response',
      'from .models import Agriculteur, Recolte, Enchere',
      '',
      'class MarketplaceAuctionViewSet(viewsets.ModelViewSet):',
      '    queryset = Recolte.objects.filter(is_verified=True)',
      '    permission_classes = [permissions.IsAuthenticated]',
      '',
      '    def create_direct_bid(self, request, pk=None):',
      '        recolte = self.get_object()',
      '        bid = recolte.place_instant_bid(',
      '            buyer=request.user,',
      '            amount_cfa=request.data.get("amount_cfa")',
      '        )',
      '        return Response({"status": "SUCCESS", "bid_id": bid.uuid})',
    ],
  },
  {
    id: 'terminal',
    filename: 'agitel_bash.sh',
    lang: 'Bash · CI/CD DevOps Pipeline',
    statusText: 'Université Agitel Formation · Licence 3 Informatique',
    lines: [
      'aziz@macbook-pro:~/projects/agrivigil$ git status -s',
      'M  src/core/gemini_service.py',
      'M  src/components/CylinderProjectCarousel.tsx',
      '',
      'aziz@macbook-pro:~/projects/agrivigil$ python -m pytest tests/ -v',
      '============================= test session starts =============================',
      'tests/test_gemini_vision.py::test_cocoa_blight PASSED                     [ 25%]',
      'tests/test_django_orm.py::test_postgres_connection PASSED                [ 50%]',
      'tests/test_react_globe.py::test_abidjan_beacon PASSED                    [ 75%]',
      'tests/test_realtime_websocket.py::test_socket_handshake PASSED           [100%]',
      '============================== 12 passed in 1.48s =============================',
      'aziz@macbook-pro:~/projects/agrivigil$ echo "Ready for Production Deploy 🚀"',
    ],
  },
];

export const DeveloperLaptopParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
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
  } | null>(null);

  // Renders ultra-crisp, prominent, beautifully highlighted code on the laptop screen texture
  const drawCodeOnScreen = (snippetIndex: number, showCursor: boolean = true) => {
    if (!threeRef.current) return;
    const { screenCanvas, screenCtx, screenTexture } = threeRef.current;
    const snippet = CODE_SNIPPETS[snippetIndex];

    const W = screenCanvas.width;
    const H = screenCanvas.height;

    // 1. Dark luxurious code editor background (VS Code Tokyo Night palette)
    screenCtx.fillStyle = '#111319';
    screenCtx.fillRect(0, 0, W, H);

    // Subtle editor vertical guideline
    screenCtx.strokeStyle = '#1A1D27';
    screenCtx.lineWidth = 1;
    screenCtx.beginPath();
    screenCtx.moveTo(850, 0);
    screenCtx.lineTo(850, H);
    screenCtx.stroke();

    // 2. Window title bar with macOS controls
    screenCtx.fillStyle = '#171922';
    screenCtx.fillRect(0, 0, W, 68);
    screenCtx.fillStyle = '#232736';
    screenCtx.fillRect(0, 67, W, 1);

    // macOS window dots (close, minimize, maximize) with subtle bevel
    const dots = [
      { x: 40, color: '#FF5F56' },
      { x: 68, color: '#FFBD2E' },
      { x: 96, color: '#27C93F' },
    ];
    dots.forEach((dot) => {
      screenCtx.fillStyle = dot.color;
      screenCtx.beginPath();
      screenCtx.arc(dot.x, 34, 9, 0, Math.PI * 2);
      screenCtx.fill();
    });

    // Active File Tab (High contrast pill)
    screenCtx.fillStyle = '#222533';
    screenCtx.roundRect(140, 12, 420, 48, [12, 12, 0, 0]);
    screenCtx.fill();

    // Tab accent dot
    screenCtx.fillStyle = '#F9A826';
    screenCtx.beginPath();
    screenCtx.arc(168, 36, 6, 0, Math.PI * 2);
    screenCtx.fill();

    screenCtx.font = 'bold 22px "JetBrains Mono", "Fira Code", monospace';
    screenCtx.fillStyle = '#FFFFFF';
    screenCtx.fillText(snippet.filename, 188, 44);

    screenCtx.font = '16px "JetBrains Mono", monospace';
    screenCtx.fillStyle = '#8E95A8';
    screenCtx.fillText('· ' + snippet.lang, 395, 44);

    // Window title center
    screenCtx.font = 'bold 16px "JetBrains Mono", monospace';
    screenCtx.fillStyle = '#636B83';
    screenCtx.textAlign = 'center';
    screenCtx.fillText("compaore-abdoul-aziz — Visual Studio Code", W / 2, 42);
    screenCtx.textAlign = 'left';

    // 3. Breadcrumbs toolbar
    screenCtx.fillStyle = '#14161F';
    screenCtx.fillRect(0, 68, W, 38);
    screenCtx.fillStyle = '#1F2330';
    screenCtx.fillRect(0, 105, W, 1);

    screenCtx.font = '16px "JetBrains Mono", monospace';
    screenCtx.fillStyle = '#F9A826';
    screenCtx.fillText('agrivigil-ai', 30, 93);
    screenCtx.fillStyle = '#5A6074';
    screenCtx.fillText(' > ', 145, 93);
    screenCtx.fillStyle = '#8E95A8';
    screenCtx.fillText('src', 170, 93);
    screenCtx.fillStyle = '#5A6074';
    screenCtx.fillText(' > ', 205, 93);
    screenCtx.fillStyle = '#FFFFFF';
    screenCtx.fillText(snippet.filename, 230, 93);

    // 4. Line numbers gutter
    const gutterW = 90;
    screenCtx.fillStyle = '#13151D';
    screenCtx.fillRect(0, 106, gutterW, H - 156);
    screenCtx.fillStyle = '#222634';
    screenCtx.fillRect(gutterW - 1, 106, 1, H - 156);

    // 5. Code Lines Rendering (LARGE, CRISP, BEAUTIFULLY HIGHLIGHTED)
    const startY = 155;
    const lineHeight = 44;
    const activeLineIdx = 5; // Highlight line 6 (class definition)

    snippet.lines.forEach((lineText, idx) => {
      const y = startY + idx * lineHeight;
      if (y > H - 75) return;

      // Active line background highlight
      if (idx === activeLineIdx) {
        screenCtx.fillStyle = '#1E2436';
        screenCtx.fillRect(gutterW, y - 32, W - gutterW - 50, lineHeight);
        // Active indicator bar on gutter
        screenCtx.fillStyle = '#F9A826';
        screenCtx.fillRect(gutterW - 5, y - 32, 5, lineHeight);
      }

      // Line number
      screenCtx.fillStyle = idx === activeLineIdx ? '#F9A826' : '#555D73';
      screenCtx.font = 'bold 22px "JetBrains Mono", monospace';
      screenCtx.fillText(String(idx + 1).padStart(2, '0'), 30, y - 2);

      // Tokenize and render syntax highlighted words
      screenCtx.font = 'bold 25px "JetBrains Mono", "Fira Code", monospace';
      let currentX = gutterW + 30;

      if (lineText.trim().startsWith('#') || lineText.trim().startsWith('//')) {
        // Entire comment line
        screenCtx.fillStyle = '#94A3B8'; // Crisp slate gray
        screenCtx.fillText(lineText, currentX, y - 2);
      } else if (lineText.includes('=============================')) {
        // Test banner
        screenCtx.fillStyle = '#38BDF8';
        screenCtx.fillText(lineText, currentX, y - 2);
      } else {
        // Multi-color tokenization by words and punctuation
        const tokens = lineText.split(/(\s+|[(),:[\]"']|\b)/);

        let inQuotes = false;
        let quoteChar = '';

        tokens.forEach((token) => {
          if (!token) return;

          // String handling
          if (token === '"' || token === "'") {
            if (!inQuotes) {
              inQuotes = true;
              quoteChar = token;
              screenCtx.fillStyle = '#4ADE80'; // Emerald neon green
            } else if (token === quoteChar) {
              inQuotes = false;
              screenCtx.fillStyle = '#4ADE80';
            }
          }

          if (inQuotes) {
            screenCtx.fillStyle = '#4ADE80'; // String literal
          } else if (
            [
              'from',
              'import',
              'class',
              'def',
              'async',
              'await',
              'return',
              'if',
              'else',
              'for',
              'in',
              'self',
              'None',
              'True',
              'False',
            ].includes(token)
          ) {
            screenCtx.fillStyle = '#FF79C6'; // Vibrant magenta / keyword
          } else if (
            [
              'Client',
              'AgriculturalPathologyDetector',
              'CropPathologyDetector',
              'DiagnosticCacaoyer',
              'MarketplaceAuctionViewSet',
              'Recolte',
              'Enchere',
              'Agriculteur',
              'Response',
              'viewsets',
              'bytes',
            ].includes(token)
          ) {
            screenCtx.fillStyle = '#FACC15'; // Bright Gold Class names
          } else if (
            [
              'analyze_leaf',
              'generate_content',
              'place_instant_bid',
              'create_direct_bid',
              'get_object',
              'filter',
              '__init__',
            ].includes(token)
          ) {
            screenCtx.fillStyle = '#38BDF8'; // Sky cyan blue functions
          } else if (['PASSED', 'SUCCESS'].includes(token)) {
            screenCtx.fillStyle = '#22C55E'; // Terminal success green
          } else if (token.startsWith('$') || token.startsWith('aziz@')) {
            screenCtx.fillStyle = '#F9A826'; // Shell prompt
          } else if (/^\d+(\.\d+)?%?$/.test(token)) {
            screenCtx.fillStyle = '#FB923C'; // Numbers / Orange
          } else if (['(', ')', ':', ',', '.', '[', ']'].includes(token)) {
            screenCtx.fillStyle = '#94A3B8'; // Punctuation
          } else {
            screenCtx.fillStyle = '#F8FAFC'; // Default crisp white code text
          }

          screenCtx.fillText(token, currentX, y - 2);
          currentX += screenCtx.measureText(token).width;
        });
      }

      // Draw typing cursor at active line
      if (idx === activeLineIdx && showCursor) {
        screenCtx.fillStyle = '#F9A826';
        screenCtx.fillRect(currentX + 6, y - 28, 5, 34);
      }
    });

    // 6. Right Minimap Preview Bar
    const minimapW = 45;
    screenCtx.fillStyle = '#13151D';
    screenCtx.fillRect(W - minimapW, 106, minimapW, H - 156);
    // Slivers indicating code lines in minimap
    for (let m = 0; m < 22; m++) {
      screenCtx.fillStyle = m === activeLineIdx ? '#F9A826' : '#2A2E3D';
      screenCtx.fillRect(W - minimapW + 10, 125 + m * 15, (m % 3 + 1) * 8, 6);
    }

    // 7. Bottom VS Code status bar
    screenCtx.fillStyle = '#0E1017';
    screenCtx.fillRect(0, H - 50, W, 50);
    screenCtx.fillStyle = '#1E222E';
    screenCtx.fillRect(0, H - 50, W, 1);

    // Git branch pill
    screenCtx.fillStyle = '#F9A826';
    screenCtx.beginPath();
    screenCtx.arc(32, H - 25, 7, 0, Math.PI * 2);
    screenCtx.fill();

    screenCtx.font = 'bold 16px "JetBrains Mono", monospace';
    screenCtx.fillStyle = '#FFFFFF';
    screenCtx.fillText('main*', 48, H - 19);

    screenCtx.fillStyle = '#22C55E';
    screenCtx.fillText('✓ 0 errors, 0 warnings', 135, H - 19);

    screenCtx.fillStyle = '#F9A826';
    screenCtx.fillText(snippet.statusText, 390, H - 19);

    // Right status info
    screenCtx.fillStyle = '#8E95A8';
    screenCtx.fillText('UTF-8   |   Spaces: 4   |   Python 3.12 (CI-AI Env)   |   Abidjan, Côte d\'Ivoire', W - 680, H - 19);

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
    camera.position.set(0, 1.2, 5.6);
    camera.lookAt(0, 0.2, 0);

    // 2. Renderer with Antialias and Soft Shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // Transparent to blend seamlessly into warm cream theme!
    mount.appendChild(renderer.domElement);

    // 3. Lighting (Warm studio key light + cool specular rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const goldFillLight = new THREE.DirectionalLight(0xf9a826, 1.9);
    goldFillLight.position.set(-6, 4, 4);
    scene.add(goldFillLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 2.2);
    rimLight.position.set(0, -4, -6);
    scene.add(rimLight);

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
      color: 0x24272f, // Premium space-gray anodized aluminum
      metalness: 0.88,
      roughness: 0.20,
    });

    const chamferTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x82889c, // Specular metallic chamfer rim
      metalness: 0.96,
      roughness: 0.05,
    });

    const darkAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e1014,
      metalness: 0.7,
      roughness: 0.4,
    });

    const keyMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161c, // Chiclet matte black
      metalness: 0.35,
      roughness: 0.55,
    });

    const keyGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd580, // Warm amber underglow backlight
      transparent: true,
      opacity: 0.35,
    });

    // A. Base Chassis (Bottom body)
    const baseGeo = new THREE.BoxGeometry(baseW, baseH, baseD);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMaterial);
    baseMesh.position.y = -baseH / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    laptopGroup.add(baseMesh);

    // Polished chamfer perimeter edge on base
    const baseRimGeo = new THREE.BoxGeometry(baseW + 0.02, 0.015, baseD + 0.02);
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
    const kbWellGeo = new THREE.BoxGeometry(3.68, 0.02, 1.65);
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
    const keyH = 0.038;
    const keyD = 0.25;
    const spacingX = 0.26;
    const spacingZ = 0.30;

    const startX = -((cols - 1) * spacingX) / 2;
    const startZ = -0.35 - ((rows - 1) * spacingZ) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Spacebar on bottom row center
        if (r === rows - 1 && c >= 4 && c <= 9) {
          if (c === 4) {
            const spaceGeo = new THREE.BoxGeometry(spacingX * 6 - 0.05, keyH, keyD);
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

        const singleKeyGeo = new THREE.BoxGeometry(keyW, keyH, keyD);
        const singleKeyMesh = new THREE.Mesh(singleKeyGeo, keyMaterial);
        singleKeyMesh.position.set(startX + c * spacingX, 0.025, startZ + r * spacingZ);
        laptopGroup.add(singleKeyMesh);
      }
    }

    // C. Frosted Precision Glass Trackpad
    const trackpadGeo = new THREE.BoxGeometry(1.75, 0.015, 1.15);
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
    const lidBackGeo = new THREE.BoxGeometry(baseW, lidH, lidThickness);
    const lidBackMesh = new THREE.Mesh(lidBackGeo, chassisMaterial);
    lidBackMesh.position.set(0, lidH / 2, -lidThickness / 2);
    lidBackMesh.castShadow = true;
    lidGroup.add(lidBackMesh);

    // Polished chamfered perimeter border on the lid
    const lidRimGeo = new THREE.BoxGeometry(baseW + 0.015, lidH + 0.015, 0.01);
    const lidRimMesh = new THREE.Mesh(lidRimGeo, chamferTrimMaterial);
    lidRimMesh.position.set(0, lidH / 2, 0.002);
    lidGroup.add(lidRimMesh);

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
    const screenGeo = new THREE.PlaneGeometry(baseW - 0.22, lidH - 0.24);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    // Positioned cleanly at z = 0.014 in front of lid backplate (no Z-fighting!)
    screenMesh.position.set(0, lidH / 2, 0.014);
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
      targetScale: 0.8,
      currentScale: 0.8,
      targetCameraZ: 5.6,
      currentCameraZ: 5.6,
      targetCameraY: 0.9,
      currentCameraY: 0.9,
    };

    // Draw initial code screen
    drawCodeOnScreen(activeSnippetIdx, true);

    // 5. Animation Loop with smooth Lerp for physics
    let lastBlink = performance.now();
    let cursorVisible = true;

    const animate = () => {
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

      // Apply to Three objects
      state.laptopGroup.rotation.y = state.currentRotationY;
      state.laptopGroup.rotation.x = state.currentRotationX;
      state.laptopGroup.scale.setScalar(state.currentScale);
      state.lidGroup.rotation.x = state.currentLidAngle;
      state.camera.position.z = state.currentCameraZ;
      state.camera.position.y = state.currentCameraY;

      state.renderer.render(state.scene, state.camera);
      state.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animationFrameId);
        threeRef.current.renderer.dispose();
        if (mount.contains(threeRef.current.renderer.domElement)) {
          mount.removeChild(threeRef.current.renderer.domElement);
        }
      }
    };
  }, []);

  // Update screen code whenever active tab changes
  useEffect(() => {
    drawCodeOnScreen(activeSnippetIdx, true);
  }, [activeSnippetIdx]);

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
      setScrollProgress(progress);

      const state = threeRef.current;

      if (progress < 0.28) {
        // PHASE 1 (0.00 -> 0.28): Closed laptop appears, smoothly unfolds and opens up to -0.38 (~112 degrees)!
        const p1 = progress / 0.28;
        state.targetScale = THREE.MathUtils.lerp(0.8, 1.08, p1);
        // Math.PI / 2 is completely flat closed, -0.38 is open ~112 degrees
        state.targetLidAngle = THREE.MathUtils.lerp(Math.PI / 2, -0.38, p1);
        state.targetRotationY = THREE.MathUtils.lerp(-0.4, 0.0, p1) + mousePos.x * 0.15;
        state.targetRotationX = THREE.MathUtils.lerp(0.35, 0.14, p1) + mousePos.y * 0.1;
      } else if (progress < 0.80) {
        // PHASE 2 (0.28 -> 0.80): Laptop does a full 360-degree rotation on itself while open!
        // The user inspects the glowing screen with real code, the keyboard, the ports, and the glowing back logo!
        const p2 = (progress - 0.28) / 0.52;
        state.targetScale = 1.08;
        state.targetLidAngle = -0.38; // stays open displaying code!
        // Full 360 degree spin on Y axis (0 -> 2*PI)
        state.targetRotationY = p2 * Math.PI * 2 + mousePos.x * 0.2;
        // Subtle organic tilt
        state.targetRotationX = 0.14 + Math.sin(p2 * Math.PI * 2) * 0.07 + mousePos.y * 0.12;
      } else {
        // PHASE 3 (0.80 -> 1.00): Exit transition into the Projects section
        const p3 = (progress - 0.80) / 0.20;
        state.targetScale = THREE.MathUtils.lerp(1.08, 1.35, p3);
        state.targetRotationY = Math.PI * 2 + p3 * 1.5;
        state.targetRotationX = THREE.MathUtils.lerp(0.14, -0.3, p3);
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

  // Holographic tech badges orbiting the workstation in Perez luxury cream style
  const orbitBadges = useMemo(
    () => [
      {
        id: 'py',
        label: 'Python POO & Django 5',
        sub: 'Architecture Backend & ORM',
        icon: Code2,
        xPos: 'left-[3%] lg:left-[6%]',
        yPos: 'top-[18%]',
      },
      {
        id: 'gem',
        label: 'Google Gemini 2.5 Flash',
        sub: 'Vision Multimodale & Diagnostics',
        icon: Sparkles,
        xPos: 'right-[3%] lg:right-[6%]',
        yPos: 'top-[20%]',
      },
      {
        id: 'db',
        label: 'PostgreSQL & Oracle 21c',
        sub: 'Data Modeling & Requêtes SQL',
        icon: Database,
        xPos: 'left-[2%] lg:left-[8%]',
        yPos: 'bottom-[20%]',
      },
      {
        id: 'front',
        label: 'React 19 & Three.js 3D',
        sub: 'Expérience Spatiale & Interfaces',
        icon: Layers,
        xPos: 'right-[2%] lg:right-[8%]',
        yPos: 'bottom-[18%]',
      },
    ],
    []
  );

  return (
    <section
      id="workstation"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[250vh] bg-gradient-to-b from-[#FFF8F1] via-[#14151C] to-[#FFF8F1] text-white selection:bg-[#F9A826] selection:text-[#141416] transition-colors duration-500"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Background Atmospheric Glows in warm gold & soft ivory */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#F9A826]/12 blur-[170px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-[520px] h-[420px] bg-[#FFF5EB]/10 blur-[190px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />
        </div>

        {/* Top Header / Context HUD */}
        <div className="relative z-20 pt-8 sm:pt-12 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#F9A826] mb-3 backdrop-blur-md">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>POSTE DE DÉVELOPPEMENT 3D INTERACTIF</span>
                <span className="text-white/20">|</span>
                <span className="text-white/70">OUVERTURE & ROTATION 360°</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
                Au Cœur de la <span className="text-[#F9A826]">Machine</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl font-medium">
                Faites défiler pour voir l'ordinateur s'ouvrir et tourner sur lui-même en dévoilant le code en temps réel sur l'écran.
              </p>
            </div>

            {/* Code Tab Switcher & Direct ZIP Download */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md self-start sm:self-auto shadow-xl">
              {CODE_SNIPPETS.map((snippet, idx) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveSnippetIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activeSnippetIdx === idx
                      ? 'bg-[#F9A826] text-[#141416] shadow-lg shadow-[#F9A826]/30 scale-102'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{snippet.filename}</span>
                  <span className="md:hidden">{snippet.id}</span>
                </button>
              ))}

              <div className="h-5 w-px bg-white/20 mx-1 hidden sm:block" />

              <a
                href="/aziz-compaore-portfolio-source.zip"
                download="aziz-compaore-portfolio-source.zip"
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 bg-white/10 hover:bg-[#F9A826] text-white hover:text-[#141416] border border-white/10 shadow-xs"
                title="Télécharger l'archive ZIP propre du code source (sans erreur de chemin long)"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Télécharger ZIP</span>
                <span className="lg:hidden">ZIP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Center: Three.js 3D Canvas Mount */}
        <div className="relative w-full flex-1 flex items-center justify-center z-10">
          <div ref={canvasMountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Orbit Tech Badges (visible while laptop is open and spinning) */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: scrollProgress > 0.18 && scrollProgress < 0.82 ? 1 : 0,
            }}
          >
            {orbitBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`absolute ${badge.xPos} ${badge.yPos} pointer-events-auto transform transition-all duration-500 hover:scale-105`}
                >
                  <div className="p-4 rounded-2xl bg-[#14151C]/85 border border-[#F5E6D3]/20 backdrop-blur-xl shadow-2xl flex items-center gap-3.5 max-w-[260px] sm:max-w-[290px]">
                    <div className="w-10 h-10 rounded-xl bg-[#F9A826]/20 border border-[#F9A826]/40 flex items-center justify-center text-[#F9A826] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {badge.label}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {badge.sub}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom HUD: Parallax Scroll Progress Bar & Controls */}
        <div className="relative z-20 pb-6 sm:pb-8 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4">
            
            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-3 text-xs text-neutral-300 font-medium">
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                <div className="w-1.5 h-2.5 rounded-full bg-[#F9A826] animate-bounce" />
              </div>
              <div>
                <span className="text-white font-bold block">Faites défiler pour animer le poste de dev 3D</span>
                <span className="text-[11px] text-neutral-400">
                  {scrollProgress < 0.28
                    ? '1/3 · Déploiement et ouverture fluide du capot'
                    : scrollProgress < 0.80
                    ? '2/3 · Rotation orbitale à 360° & inspection du code réel sur l\'écran'
                    : '3/3 · Transition cinématique vers la galerie des projets'}
                </span>
              </div>
            </div>

            {/* Parallax Progress Track */}
            <div className="w-full sm:w-64 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F9A826] to-[#FFD066] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#F9A826] w-12 text-right">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Code Status Badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fichier actif: <strong className="text-white">{CODE_SNIPPETS[activeSnippetIdx].filename}</strong></span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
