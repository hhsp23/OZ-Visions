"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroShaderProps = {
  src: string;
};

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform vec2 u_mouse;
  uniform vec2 u_tail;
  uniform float u_time;
  uniform float u_hover;

  varying vec2 v_uv;

  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  vec3 spectrum(float hue) {
    vec3 rgb = clamp(
      abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
      0.0,
      1.0
    );
    return rgb * rgb * (3.0 - 2.0 * rgb);
  }

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
  }

  vec2 coverUv(vec2 uv) {
    float canvasAspect = u_resolution.x / u_resolution.y;
    float imageAspect = u_imageResolution.x / u_imageResolution.y;
    vec2 scale = vec2(1.0);

    if (canvasAspect > imageAspect) {
      scale.y = imageAspect / canvasAspect;
    } else {
      scale.x = canvasAspect / imageAspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  vec3 edgeGradient(vec2 uv, vec2 texel) {
    float left = luminance(texture2D(u_image, uv - vec2(texel.x, 0.0)).rgb);
    float right = luminance(texture2D(u_image, uv + vec2(texel.x, 0.0)).rgb);
    float below = luminance(texture2D(u_image, uv - vec2(0.0, texel.y)).rgb);
    float above = luminance(texture2D(u_image, uv + vec2(0.0, texel.y)).rgb);
    vec2 gradient = vec2(right - left, above - below);
    return vec3(gradient, length(gradient) * 3.2);
  }

  void main() {
    vec2 screenUv = v_uv;
    vec2 imageUv = coverUv(screenUv);
    vec3 base = texture2D(u_image, imageUv).rgb;

    if (u_hover < 0.001) {
      gl_FragColor = vec4(base, 1.0);
      return;
    }

    float aspect = u_resolution.x / u_resolution.y;
    vec2 point = vec2(screenUv.x * aspect, screenUv.y);
    vec2 head = vec2(u_mouse.x * aspect, u_mouse.y);
    vec2 tail = vec2(u_tail.x * aspect, u_tail.y);
    vec2 travel = head - tail;
    float travelLength = length(travel);
    vec2 tangent = travel / max(travelLength, 0.0001);
    vec2 normal = vec2(-tangent.y, tangent.x);

    vec2 fromTail = point - tail;
    float segmentProgress = clamp(
      dot(fromTail, travel) / max(dot(travel, travel), 0.0001),
      0.0,
      1.0
    );
    vec2 nearestTrailPoint = tail + travel * segmentProgress;
    float trailDistance = length(point - nearestTrailPoint);
    float headDistance = length(point - head);

    float motion = smoothstep(0.004, 0.24, travelLength) * u_hover;
    float headMask = 1.0 - smoothstep(0.018, 0.285, headDistance);
    float trailRadius = mix(0.07, 0.155, motion);
    float trailMask =
      1.0 - smoothstep(0.006, trailRadius, trailDistance);
    float trailTaper = mix(0.28, 1.0, pow(segmentProgress, 0.58));
    float liquidMask = max(headMask * 0.82, trailMask * trailTaper);

    float side = dot(point - nearestTrailPoint, normal);
    float elasticBend =
      sin(segmentProgress * 7.2 - u_time * 3.1 + side * 15.0) *
      trailMask *
      motion *
      0.018;
    float dragStrength =
      (0.54 + motion * 0.78) *
      liquidMask *
      motion;

    vec2 displacement = -travel * dragStrength;
    displacement += normal * elasticBend;
    displacement +=
      (head - point) *
      headMask *
      motion *
      (0.08 + 0.08 * motion);
    displacement.x /= aspect;

    screenUv += displacement;
    imageUv = clamp(coverUv(screenUv), vec2(0.001), vec2(0.999));

    vec2 texel = 1.0 / u_imageResolution;
    vec3 edgeData = edgeGradient(imageUv, texel * 1.35);
    vec2 gradientDirection = normalize(edgeData.xy + vec2(0.0001));
    float edge = smoothstep(0.075, 0.62, edgeData.z);
    float effectStrength = liquidMask * motion;

    vec2 chromaShift =
      gradientDirection *
      texel *
      (2.0 + 7.0 * motion) *
      effectStrength;

    float red = texture2D(u_image, clamp(imageUv + chromaShift, 0.001, 0.999)).r;
    float green = texture2D(u_image, imageUv).g;
    float blue = texture2D(u_image, clamp(imageUv - chromaShift, 0.001, 0.999)).b;
    vec3 separated = vec3(red, green, blue);

    float hue = fract(
      imageUv.x * 0.62 +
      imageUv.y * 0.18 +
      atan(edgeData.y, edgeData.x) / 6.28318 +
      u_time * 0.028
    );
    vec3 rainbow = spectrum(hue);
    float rainbowEdge = edge * effectStrength;

    vec3 color = mix(
      texture2D(u_image, imageUv).rgb,
      separated,
      effectStrength * 0.42
    );
    color = mix(color, rainbow, rainbowEdge * 0.34);
    color += rainbow * rainbowEdge * 0.11;

    float grain = hash(gl_FragCoord.xy + u_time) - 0.5;
    color += grain * 0.009 * effectStrength;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function HeroShader({ src }: HeroShaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const hero = root?.parentElement;

    if (!root || !canvas || !hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    if (reducedMotion || coarsePointer) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    const vertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource,
    );
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const positionBuffer = gl.createBuffer();
    const texture = gl.createTexture();

    if (!positionBuffer || !texture) return;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      image: gl.getUniformLocation(program, "u_image"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      imageResolution: gl.getUniformLocation(program, "u_imageResolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      tail: gl.getUniformLocation(program, "u_tail"),
      time: gl.getUniformLocation(program, "u_time"),
      hover: gl.getUniformLocation(program, "u_hover"),
    };

    let imageWidth = 1;
    let imageHeight = 1;
    let hoverTarget = 0;
    let hoverValue = 0;
    let headX = 0.5;
    let headY = 0.5;
    let tailX = 0.5;
    let tailY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let frameId = 0;
    let running = false;
    let textureReady = false;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      const rawWidth = Math.max(1, rect.width * pixelRatio);
      const rawHeight = Math.max(1, rect.height * pixelRatio);
      const scale = Math.min(1, 2880 / rawWidth, 1800 / rawHeight);
      const width = Math.max(1, Math.round(rawWidth * scale));
      const height = Math.max(1, Math.round(rawHeight * scale));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (timestamp: number) => {
      if (!textureReady) {
        running = false;
        return;
      }

      hoverValue += (hoverTarget - hoverValue) * 0.085;
      headX += (targetMouseX - headX) * 0.34;
      headY += (targetMouseY - headY) * 0.34;
      tailX += (headX - tailX) * 0.055;
      tailY += (headY - tailY) * 0.055;

      const trailDistance = Math.hypot(headX - tailX, headY - tailY);

      gl.useProgram(program);
      gl.uniform1i(uniforms.image, 0);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.imageResolution, imageWidth, imageHeight);
      gl.uniform2f(uniforms.mouse, headX, headY);
      gl.uniform2f(uniforms.tail, tailX, tailY);
      gl.uniform1f(uniforms.time, timestamp * 0.001);
      gl.uniform1f(uniforms.hover, hoverValue);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (
        hoverTarget > 0 ||
        hoverValue > 0.002 ||
        trailDistance > 0.0001
      ) {
        frameId = window.requestAnimationFrame(draw);
      } else {
        hoverValue = 0;
        headX = targetMouseX;
        headY = targetMouseY;
        tailX = targetMouseX;
        tailY = targetMouseY;
        running = false;
      }
    };

    const startDrawing = () => {
      if (running || !textureReady) return;
      running = true;
      frameId = window.requestAnimationFrame(draw);
    };

    const updatePointerTarget = (event: PointerEvent, snap = false) => {
      const rect = hero.getBoundingClientRect();
      targetMouseX = Math.min(
        1,
        Math.max(0, (event.clientX - rect.left) / rect.width),
      );
      targetMouseY = Math.min(
        1,
        Math.max(0, 1 - (event.clientY - rect.top) / rect.height),
      );

      if (snap) {
        headX = targetMouseX;
        headY = targetMouseY;
        tailX = targetMouseX;
        tailY = targetMouseY;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerTarget(event);
      startDrawing();
    };

    const handlePointerEnter = (event: PointerEvent) => {
      updatePointerTarget(event, true);
      hoverTarget = 1;
      root.classList.add("is-hovering");
      startDrawing();
    };

    const handlePointerLeave = () => {
      hoverTarget = 0;
      root.classList.remove("is-hovering");
      startDrawing();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      root.classList.remove("is-webgl-ready");
      window.cancelAnimationFrame(frameId);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      startDrawing();
    });
    resizeObserver.observe(root);

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerenter", handlePointerEnter);
    hero.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("webglcontextlost", handleContextLost);

    const sourceImage = new window.Image();
    sourceImage.decoding = "async";
    sourceImage.onload = () => {
      imageWidth = sourceImage.naturalWidth;
      imageHeight = sourceImage.naturalHeight;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        sourceImage,
      );

      textureReady = true;
      resize();
      root.classList.add("is-webgl-ready");
      startDrawing();
    };
    sourceImage.src = src;

    return () => {
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerenter", handlePointerEnter);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      window.cancelAnimationFrame(frameId);
      root.classList.remove("is-webgl-ready", "is-hovering");
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [src]);

  return (
    <div className="hero-visual" ref={rootRef}>
      <Image
        className="hero-image hero-image-fallback"
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <canvas
        className="hero-shader-canvas"
        ref={canvasRef}
        aria-hidden="true"
      />
    </div>
  );
}
