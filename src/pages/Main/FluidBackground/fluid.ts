/* eslint-disable no-unused-expressions */
/*
MIT License
Copyright (c) 2017 Pavel Dobryakov
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import LDR_LLL1_0 from './LDR_LLL1_0.png'

// Simulation section

export function init(canvas: HTMLCanvasElement) {
    resizeCanvas()

    const config = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1,
        VELOCITY_DISSIPATION: 0.2,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 255, g: 255, b: 255 },
        TRANSPARENT: false,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.8,
        BLOOM_THRESHOLD: 0.6,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: true,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0
    }

    function makePointer() {
        return {
            texcoordY: 0,
            texcoordX: 0,
            prevTexcoordX: 0,
            prevTexcoordY: 0,
            deltaX: 0,
            deltaY: 0,
            down: false,
            moved: false,
            color: { r: 30, g: 0, b: 300 },
            id: -1
        }
    }

    type Pointer = ReturnType<typeof makePointer>

    const pointers: Pointer[] = [makePointer()]
    const splatStack: number[] = []

    const { gl, ext } = getWebGLContext(canvas)

    if (isMobile()) {
        config.DYE_RESOLUTION = 512
    }
    if (!ext.supportLinearFiltering) {
        config.DYE_RESOLUTION = 512
        config.SHADING = false
        config.BLOOM = false
        config.SUNRAYS = false
    }

    function getWebGLContext(canvas: HTMLCanvasElement) {
        const params = {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false
        }

        let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext
        const isWebGL2 = !!gl
        if (!isWebGL2)
            gl =
                (canvas.getContext('webgl', params) as WebGL2RenderingContext) ||
                (canvas.getContext('experimental-webgl', params) as WebGL2RenderingContext)

        let halfFloat
        let supportLinearFiltering
        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float')
            supportLinearFiltering = gl.getExtension('OES_texture_float_linear')
        } else {
            halfFloat = gl.getExtension('OES_texture_half_float')
            supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear')
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0)

        const halfFloatTexType = halfFloat ? halfFloat.HALF_FLOAT_OES : gl.HALF_FLOAT
        let formatRGBA
        let formatRG
        let formatR

        if (isWebGL2) {
            formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType)!
            formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType)!
            formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType)!
        } else {
            formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)!
            formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)!
            formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)!
        }

        if (formatRGBA === null) throw new Error('unable to determine formatRGBA')
        if (formatRG === null) throw new Error('unable to determine formatRG')
        if (formatR === null) throw new Error('unable to determine formatR')

        return {
            gl,
            ext: {
                formatRGBA,
                formatRG,
                formatR,
                halfFloatTexType,
                supportLinearFiltering
            }
        }
    }

    function getSupportedFormat(
        gl: WebGL2RenderingContext,
        internalFormat: number,
        format: number,
        type: number
    ): {
        internalFormat: number
        format: number
    } | null {
        if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
            switch (internalFormat) {
                case gl.R16F:
                    return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
                case gl.RG16F:
                    return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
                default:
                    return null
            }
        }

        return {
            internalFormat,
            format
        }
    }

    function supportRenderTextureFormat(
        gl: WebGL2RenderingContext,
        internalFormat: number,
        format: number,
        type: number
    ) {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

        const fbo = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
        return status == gl.FRAMEBUFFER_COMPLETE
    }

    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent)
    }

    class Program {
        program: WebGLProgram
        private uniforms: Record<string, WebGLUniformLocation> = {}

        constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
            this.program = createProgram(vertexShader, fragmentShader)
            this.uniforms = getUniforms(this.program)
        }

        bind() {
            gl.useProgram(this.program)
        }

        getUniform(name: string): WebGLUniformLocation {
            const location = this.uniforms[name]
            if (location === undefined) throw new Error(`cannot find uniform ${name}`)
            return location
        }
    }

    class Material {
        vertexShader: WebGLShader
        fragmentShaderSource: string
        programs: Record<number, Program> = {}
        activeProgram: Program | null = null

        constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
            this.vertexShader = vertexShader
            this.fragmentShaderSource = fragmentShaderSource
        }

        setKeywords(keywords: string[]) {
            const hash = keywords.reduce((hash, keyword) => hash + hashCode(keyword), 0)

            let program = this.programs[hash]
            if (program == null) {
                const fragmentShader = compileShader(
                    gl.FRAGMENT_SHADER,
                    this.fragmentShaderSource,
                    keywords
                )
                program = new Program(this.vertexShader, fragmentShader)
                this.programs[hash] = program
            }

            if (program == this.activeProgram) return

            this.activeProgram = program
        }

        bind() {
            this.activeProgram?.bind()
        }

        getUniform(name: string) {
            if (!this.activeProgram) throw new Error('no activeProgram!')
            return this.activeProgram.getUniform(name)
        }
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl.createProgram()!
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
            console.trace(gl.getProgramInfoLog(program))

        return program
    }

    function getUniforms(program: WebGLProgram) {
        const uniforms: Record<string, WebGLUniformLocation> = {}
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number
        for (let i = 0; i < uniformCount; i++) {
            const uniformName = gl.getActiveUniform(program, i)?.name || ''
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName)!
        }
        return uniforms
    }

    function compileShader(type: GLenum, source: string, keywords: string[] | null = null) {
        source = addKeywords(source, keywords)

        const shader = gl.createShader(type)!
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            console.trace(gl.getShaderInfoLog(shader))

        return shader
    }

    function addKeywords(source: string, keywords: string[] | null): string {
        if (keywords == null) return source
        let keywordsString = ''
        keywords.forEach(keyword => {
            keywordsString += '#define ' + keyword + '\n'
        })
        return keywordsString + source
    }

    const baseVertexShader = compileShader(
        gl.VERTEX_SHADER,
        `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`
    )

    const blurVertexShader = compileShader(
        gl.VERTEX_SHADER,
        `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`
    )

    const blurShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`
    )

    const copyShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`
    )

    const clearShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`
    )

    const colorShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    uniform vec4 color;
    void main () {
        gl_FragColor = color;
    }
`
    )

    const checkerboardShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;
    #define SCALE 25.0
    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`
    )

    const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;
    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;
        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif
    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif
    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif
    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`

    const bloomPrefilterShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`
    )

    const bloomBlurShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`
    )

    const bloomFinalShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`
    )

    const sunraysMaskShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`
    )

    const sunraysShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;
    #define ITERATIONS 16
    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;
        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;
        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;
        float color = texture2D(uTexture, vUv).a;
        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }
        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`
    )

    const splatShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`
    )

    const advectionShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;
    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,
        ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    )

    const divergenceShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`
    )

    const curlShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`
    )

    const vorticityShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`
    )

    const pressureShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`
    )

    const gradientSubtractShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`
    )

    const blit = (() => {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
            gl.STATIC_DRAW
        )
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(0)

        return (target: FBO | null, clear = false) => {
            if (target == null) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
                gl.bindFramebuffer(gl.FRAMEBUFFER, null)
            } else {
                gl.viewport(0, 0, target.width, target.height)
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
            }
            if (clear) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0)
                gl.clear(gl.COLOR_BUFFER_BIT)
            }
            // CHECK_FRAMEBUFFER_STATUS();
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
        }
    })()

    // function CHECK_FRAMEBUFFER_STATUS() {
    //     let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
    //     if (status != gl.FRAMEBUFFER_COMPLETE) console.trace('Framebuffer error: ' + status)
    // }

    let dye: DoubleFBO | null = null
    let velocity: DoubleFBO | null = null
    let divergence: FBO | null = null
    let curl: FBO | null = null
    let pressure: DoubleFBO | null = null
    let bloom: FBO | null = null
    const bloomFramebuffers: FBO[] = []
    let sunrays: FBO | null = null
    let sunraysTemp: FBO | null = null

    const ditheringTexture = createTextureAsync(LDR_LLL1_0)

    const blurProgram = new Program(blurVertexShader, blurShader)
    const copyProgram = new Program(baseVertexShader, copyShader)
    const clearProgram = new Program(baseVertexShader, clearShader)
    const colorProgram = new Program(baseVertexShader, colorShader)
    const checkerboardProgram = new Program(baseVertexShader, checkerboardShader)
    const bloomPrefilterProgram = new Program(baseVertexShader, bloomPrefilterShader)
    const bloomBlurProgram = new Program(baseVertexShader, bloomBlurShader)
    const bloomFinalProgram = new Program(baseVertexShader, bloomFinalShader)
    const sunraysMaskProgram = new Program(baseVertexShader, sunraysMaskShader)
    const sunraysProgram = new Program(baseVertexShader, sunraysShader)
    const splatProgram = new Program(baseVertexShader, splatShader)
    const advectionProgram = new Program(baseVertexShader, advectionShader)
    const divergenceProgram = new Program(baseVertexShader, divergenceShader)
    const curlProgram = new Program(baseVertexShader, curlShader)
    const vorticityProgram = new Program(baseVertexShader, vorticityShader)
    const pressureProgram = new Program(baseVertexShader, pressureShader)
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader)

    const displayMaterial = new Material(baseVertexShader, displayShaderSource)

    // вызывается еще и при ресайзе
    function initFramebuffers() {
        const simRes = getResolution(config.SIM_RESOLUTION)
        const dyeRes = getResolution(config.DYE_RESOLUTION)

        const texType = ext.halfFloatTexType
        const rgba = ext.formatRGBA
        const rg = ext.formatRG
        const r = ext.formatR
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

        gl.disable(gl.BLEND)

        if (dye == null)
            dye = createDoubleFBO(
                dyeRes.width,
                dyeRes.height,
                rgba.internalFormat,
                rgba.format,
                texType,
                filtering
            )
        else
            dye = resizeDoubleFBO(
                dye,
                dyeRes.width,
                dyeRes.height,
                rgba.internalFormat,
                rgba.format,
                texType,
                filtering
            )

        if (velocity == null)
            velocity = createDoubleFBO(
                simRes.width,
                simRes.height,
                rg.internalFormat,
                rg.format,
                texType,
                filtering
            )
        else
            velocity = resizeDoubleFBO(
                velocity,
                simRes.width,
                simRes.height,
                rg.internalFormat,
                rg.format,
                texType,
                filtering
            )

        divergence = createFBO(
            simRes.width,
            simRes.height,
            r.internalFormat,
            r.format,
            texType,
            gl.NEAREST
        )
        curl = createFBO(
            simRes.width,
            simRes.height,
            r.internalFormat,
            r.format,
            texType,
            gl.NEAREST
        )
        pressure = createDoubleFBO(
            simRes.width,
            simRes.height,
            r.internalFormat,
            r.format,
            texType,
            gl.NEAREST
        )

        initBloomFramebuffers()
        initSunraysFramebuffers()
    }

    function initBloomFramebuffers() {
        const res = getResolution(config.BLOOM_RESOLUTION)

        const texType = ext.halfFloatTexType
        const rgba = ext.formatRGBA
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

        bloom = createFBO(
            res.width,
            res.height,
            rgba.internalFormat,
            rgba.format,
            texType,
            filtering
        )

        bloomFramebuffers.length = 0
        // блюр, свечение
        for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
            const width = res.width >> (i + 1)
            const height = res.height >> (i + 1)

            if (width < 2 || height < 2) break

            const fbo = createFBO(
                width,
                height,
                rgba.internalFormat,
                rgba.format,
                texType,
                filtering
            )
            bloomFramebuffers.push(fbo)
        }
    }

    function initSunraysFramebuffers() {
        const res = getResolution(config.SUNRAYS_RESOLUTION)

        const texType = ext.halfFloatTexType
        const r = ext.formatR
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

        sunrays = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering)
        sunraysTemp = createFBO(
            res.width,
            res.height,
            r.internalFormat,
            r.format,
            texType,
            filtering
        )
    }

    function createFBO(
        w: number,
        h: number,
        internalFormat: GLint,
        format: GLenum,
        type: GLenum,
        param: GLint
    ) {
        gl.activeTexture(gl.TEXTURE0)
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

        const fbo = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
        gl.viewport(0, 0, w, h)
        gl.clear(gl.COLOR_BUFFER_BIT)

        const texelSizeX = 1.0 / w
        const texelSizeY = 1.0 / h

        return {
            texture,
            fbo,
            width: w,
            height: h,
            texelSizeX,
            texelSizeY,
            attach(id: number) {
                gl.activeTexture(gl.TEXTURE0 + id)
                gl.bindTexture(gl.TEXTURE_2D, texture)
                return id
            }
        }
    }

    type FBO = ReturnType<typeof createFBO>

    function createDoubleFBO(
        w: number,
        h: number,
        internalFormat: GLint,
        format: GLenum,
        type: GLenum,
        param: GLint
    ) {
        let fbo1 = createFBO(w, h, internalFormat, format, type, param)
        let fbo2 = createFBO(w, h, internalFormat, format, type, param)

        return {
            width: w,
            height: h,
            texelSizeX: fbo1.texelSizeX,
            texelSizeY: fbo1.texelSizeY,
            get read() {
                return fbo1
            },
            set read(value) {
                fbo1 = value
            },
            get write() {
                return fbo2
            },
            set write(value) {
                fbo2 = value
            },
            swap() {
                ;[fbo1, fbo2] = [fbo2, fbo1]
            }
        }
    }

    type DoubleFBO = ReturnType<typeof createDoubleFBO>

    function resizeFBO(
        target: FBO,
        w: number,
        h: number,
        internalFormat: GLint,
        format: GLenum,
        type: GLenum,
        param: GLint
    ) {
        const newFBO = createFBO(w, h, internalFormat, format, type, param)
        copyProgram.bind()
        gl.uniform1i(copyProgram.getUniform('uTexture'), target.attach(0))
        blit(newFBO)
        return newFBO
    }

    function resizeDoubleFBO(
        target: DoubleFBO,
        w: number,
        h: number,
        internalFormat: GLint,
        format: GLenum,
        type: GLenum,
        param: GLint
    ) {
        if (target.width == w && target.height == h) return target
        target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param)
        target.write = createFBO(w, h, internalFormat, format, type, param)
        target.width = w
        target.height = h
        target.texelSizeX = 1.0 / w
        target.texelSizeY = 1.0 / h
        return target
    }

    function createTextureAsync(url: string) {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGB,
            1,
            1,
            0,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            new Uint8Array([255, 255, 255])
        )

        const obj = {
            texture,
            width: 1,
            height: 1,
            attach(id: number) {
                gl.activeTexture(gl.TEXTURE0 + id)
                gl.bindTexture(gl.TEXTURE_2D, texture)
                return id
            }
        }

        const image = new Image()
        image.onload = () => {
            obj.width = image.width
            obj.height = image.height
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
        }
        image.src = url

        return obj
    }

    type Texture = ReturnType<typeof createTextureAsync>

    function updateKeywords() {
        const displayKeywords: string[] = []
        if (config.SHADING) displayKeywords.push('SHADING')
        if (config.BLOOM) displayKeywords.push('BLOOM')
        if (config.SUNRAYS) displayKeywords.push('SUNRAYS')
        displayMaterial.setKeywords(displayKeywords)
    }

    updateKeywords()
    initFramebuffers()
    multipleSplats(((Math.random() * 20) | 0) + 5)

    let lastUpdateTime = Date.now()
    let colorUpdateTimer = 0.0
    update()

    function update() {
        const dt = calcDeltaTime()
        if (resizeCanvas()) initFramebuffers()
        updateColors(dt)
        applyInputs()
        if (!config.PAUSED) step(dt)
        render(null)
        requestAnimationFrame(update)
    }

    function calcDeltaTime() {
        const now = Date.now()
        let dt = (now - lastUpdateTime) / 1000
        dt = Math.min(dt, 0.016666)
        lastUpdateTime = now
        return dt
    }

    function resizeCanvas() {
        const width = scaleByPixelRatio(canvas.clientWidth)
        const height = scaleByPixelRatio(canvas.clientHeight)
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width
            canvas.height = height
            return true
        }
        return false
    }

    function updateColors(dt: number) {
        if (!config.COLORFUL) return

        colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED
        if (colorUpdateTimer >= 1) {
            colorUpdateTimer = wrap(colorUpdateTimer, 0, 1)
            pointers.forEach(p => {
                p.color = generateColor()
            })
        }
    }

    function applyInputs() {
        if (splatStack.length > 0) multipleSplats(splatStack.pop()!)

        pointers.forEach(p => {
            if (p.moved) {
                p.moved = false
                splatPointer(p)
            }
        })
    }

    function step(dt: number) {
        if (!velocity || !divergence || !curl || !dye || !pressure) {
            throw new Error('some FBOs not initialized')
        }

        gl.disable(gl.BLEND)

        curlProgram.bind()
        gl.uniform2f(curlProgram.getUniform('texelSize'), velocity.texelSizeX, velocity.texelSizeY)
        gl.uniform1i(curlProgram.getUniform('uVelocity'), velocity.read.attach(0))
        blit(curl)

        vorticityProgram.bind()
        gl.uniform2f(
            vorticityProgram.getUniform('texelSize'),
            velocity.texelSizeX,
            velocity.texelSizeY
        )
        gl.uniform1i(vorticityProgram.getUniform('uVelocity'), velocity.read.attach(0))
        gl.uniform1i(vorticityProgram.getUniform('uCurl'), curl.attach(1))
        gl.uniform1f(vorticityProgram.getUniform('curl'), config.CURL)
        gl.uniform1f(vorticityProgram.getUniform('dt'), dt)
        blit(velocity.write)
        velocity.swap()

        divergenceProgram.bind()
        gl.uniform2f(
            divergenceProgram.getUniform('texelSize'),
            velocity.texelSizeX,
            velocity.texelSizeY
        )
        gl.uniform1i(divergenceProgram.getUniform('uVelocity'), velocity.read.attach(0))
        blit(divergence)

        clearProgram.bind()
        gl.uniform1i(clearProgram.getUniform('uTexture'), pressure.read.attach(0))
        gl.uniform1f(clearProgram.getUniform('value'), config.PRESSURE)
        blit(pressure.write)
        pressure.swap()

        pressureProgram.bind()
        gl.uniform2f(
            pressureProgram.getUniform('texelSize'),
            velocity.texelSizeX,
            velocity.texelSizeY
        )
        gl.uniform1i(pressureProgram.getUniform('uDivergence'), divergence.attach(0))
        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
            gl.uniform1i(pressureProgram.getUniform('uPressure'), pressure.read.attach(1))
            blit(pressure.write)
            pressure.swap()
        }

        gradienSubtractProgram.bind()
        gl.uniform2f(
            gradienSubtractProgram.getUniform('texelSize'),
            velocity.texelSizeX,
            velocity.texelSizeY
        )
        gl.uniform1i(gradienSubtractProgram.getUniform('uPressure'), pressure.read.attach(0))
        gl.uniform1i(gradienSubtractProgram.getUniform('uVelocity'), velocity.read.attach(1))
        blit(velocity.write)
        velocity.swap()

        advectionProgram.bind()
        gl.uniform2f(
            advectionProgram.getUniform('texelSize'),
            velocity.texelSizeX,
            velocity.texelSizeY
        )
        if (!ext.supportLinearFiltering)
            gl.uniform2f(
                advectionProgram.getUniform('dyeTexelSize'),
                velocity.texelSizeX,
                velocity.texelSizeY
            )
        const velocityId = velocity.read.attach(0)
        gl.uniform1i(advectionProgram.getUniform('uVelocity'), velocityId)
        gl.uniform1i(advectionProgram.getUniform('uSource'), velocityId)
        gl.uniform1f(advectionProgram.getUniform('dt'), dt)
        gl.uniform1f(advectionProgram.getUniform('dissipation'), config.VELOCITY_DISSIPATION)
        blit(velocity.write)
        velocity.swap()

        if (!ext.supportLinearFiltering)
            gl.uniform2f(
                advectionProgram.getUniform('dyeTexelSize'),
                dye.texelSizeX,
                dye.texelSizeY
            )
        gl.uniform1i(advectionProgram.getUniform('uVelocity'), velocity.read.attach(0))
        gl.uniform1i(advectionProgram.getUniform('uSource'), dye.read.attach(1))
        gl.uniform1f(advectionProgram.getUniform('dissipation'), config.DENSITY_DISSIPATION)
        blit(dye.write)
        dye.swap()
    }

    function render(target: FBO | null) {
        if (config.BLOOM) {
            if (!dye || !bloom) throw new Error('missing required FBOs')
            applyBloom(dye.read, bloom)
        }
        if (config.SUNRAYS) {
            if (!dye || !sunrays || !sunraysTemp) throw new Error('missing required FBOs')
            applySunrays(dye.read, dye.write, sunrays)
            blur(sunrays, sunraysTemp, 1)
        }

        if (target == null || !config.TRANSPARENT) {
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
            gl.enable(gl.BLEND)
        } else {
            gl.disable(gl.BLEND)
        }

        if (!config.TRANSPARENT) drawColor(target, normalizeColor(config.BACK_COLOR))
        if (target == null && config.TRANSPARENT) drawCheckerboard(target)
        drawDisplay(target)
    }

    function drawColor(target: FBO | null, color: Color) {
        colorProgram.bind()
        gl.uniform4f(colorProgram.getUniform('color'), color.r, color.g, color.b, 1)
        blit(target)
    }

    function drawCheckerboard(target: FBO | null) {
        checkerboardProgram.bind()
        gl.uniform1f(checkerboardProgram.getUniform('aspectRatio'), canvas.width / canvas.height)
        blit(target)
    }

    function drawDisplay(target: FBO | null) {
        if (!dye) throw new Error('no dye!')

        const width = target == null ? gl.drawingBufferWidth : target.width
        const height = target == null ? gl.drawingBufferHeight : target.height

        displayMaterial.bind()
        if (config.SHADING) {
            gl.uniform2f(displayMaterial.getUniform('texelSize'), 1.0 / width, 1.0 / height)
        }
        gl.uniform1i(displayMaterial.getUniform('uTexture'), dye.read.attach(0))
        if (config.BLOOM) {
            if (!bloom) throw new Error('no bloom!')
            gl.uniform1i(displayMaterial.getUniform('uBloom'), bloom.attach(1))
            gl.uniform1i(displayMaterial.getUniform('uDithering'), ditheringTexture.attach(2))
            const scale = getTextureScale(ditheringTexture, width, height)
            gl.uniform2f(displayMaterial.getUniform('ditherScale'), scale.x, scale.y)
        }
        if (config.SUNRAYS) {
            if (!sunrays) throw new Error('no sunrays!')
            gl.uniform1i(displayMaterial.getUniform('uSunrays'), sunrays.attach(3))
        }
        blit(target)
    }

    function applyBloom(source: FBO, destination: FBO) {
        if (bloomFramebuffers.length < 2) return

        let last = destination

        gl.disable(gl.BLEND)
        bloomPrefilterProgram.bind()
        const knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001
        const curve0 = config.BLOOM_THRESHOLD - knee
        const curve1 = knee * 2
        const curve2 = 0.25 / knee
        gl.uniform3f(bloomPrefilterProgram.getUniform('curve'), curve0, curve1, curve2)
        gl.uniform1f(bloomPrefilterProgram.getUniform('threshold'), config.BLOOM_THRESHOLD)
        gl.uniform1i(bloomPrefilterProgram.getUniform('uTexture'), source.attach(0))
        blit(last)

        bloomBlurProgram.bind()
        for (const dest of bloomFramebuffers) {
            gl.uniform2f(bloomBlurProgram.getUniform('texelSize'), last.texelSizeX, last.texelSizeY)
            gl.uniform1i(bloomBlurProgram.getUniform('uTexture'), last.attach(0))
            blit(dest)
            last = dest
        }

        gl.blendFunc(gl.ONE, gl.ONE)
        gl.enable(gl.BLEND)

        for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
            const baseTex = bloomFramebuffers[i]!
            gl.uniform2f(bloomBlurProgram.getUniform('texelSize'), last.texelSizeX, last.texelSizeY)
            gl.uniform1i(bloomBlurProgram.getUniform('uTexture'), last.attach(0))
            gl.viewport(0, 0, baseTex.width, baseTex.height)
            blit(baseTex)
            last = baseTex
        }

        gl.disable(gl.BLEND)
        bloomFinalProgram.bind()
        gl.uniform2f(bloomFinalProgram.getUniform('texelSize'), last.texelSizeX, last.texelSizeY)
        gl.uniform1i(bloomFinalProgram.getUniform('uTexture'), last.attach(0))
        gl.uniform1f(bloomFinalProgram.getUniform('intensity'), config.BLOOM_INTENSITY)
        blit(destination)
    }

    function applySunrays(source: FBO, mask: FBO, destination: FBO) {
        gl.disable(gl.BLEND)
        sunraysMaskProgram.bind()
        gl.uniform1i(sunraysMaskProgram.getUniform('uTexture'), source.attach(0))
        blit(mask)

        sunraysProgram.bind()
        gl.uniform1f(sunraysProgram.getUniform('weight'), config.SUNRAYS_WEIGHT)
        gl.uniform1i(sunraysProgram.getUniform('uTexture'), mask.attach(0))
        blit(destination)
    }

    function blur(target: FBO, temp: FBO, iterations: number) {
        blurProgram.bind()
        for (let i = 0; i < iterations; i++) {
            gl.uniform2f(blurProgram.getUniform('texelSize'), target.texelSizeX, 0.0)
            gl.uniform1i(blurProgram.getUniform('uTexture'), target.attach(0))
            blit(temp)

            gl.uniform2f(blurProgram.getUniform('texelSize'), 0.0, target.texelSizeY)
            gl.uniform1i(blurProgram.getUniform('uTexture'), temp.attach(0))
            blit(target)
        }
    }

    function splatPointer(pointer: Pointer) {
        const dx = pointer.deltaX * config.SPLAT_FORCE
        const dy = pointer.deltaY * config.SPLAT_FORCE
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color)
    }

    function multipleSplats(amount: number) {
        for (let i = 0; i < amount; i++) {
            const color = generateColor()
            color.r *= 10.0
            color.g *= 7.0
            color.b *= 10.0
            const x = Math.random()
            const y = Math.random()
            const dx = 1000 * (Math.random() - 0.5)
            const dy = 1000 * (Math.random() - 0.5)
            splat(x, y, dx, dy, color)
        }
    }

    function splat(x: number, y: number, dx: number, dy: number, color: Color) {
        if (!velocity || !dye) throw new Error('some FBOs not initialized!')

        splatProgram.bind()
        gl.uniform1i(splatProgram.getUniform('uTarget'), velocity.read.attach(0))
        gl.uniform1f(splatProgram.getUniform('aspectRatio'), canvas.width / canvas.height)
        gl.uniform2f(splatProgram.getUniform('point'), x, y)
        gl.uniform3f(splatProgram.getUniform('color'), dx, dy, 0.0)
        gl.uniform1f(splatProgram.getUniform('radius'), correctRadius(config.SPLAT_RADIUS / 100.0))
        blit(velocity.write)
        velocity.swap()

        gl.uniform1i(splatProgram.getUniform('uTarget'), dye.read.attach(0))
        gl.uniform3f(splatProgram.getUniform('color'), color.r, color.g, color.b)
        blit(dye.write)
        dye.swap()
    }

    function correctRadius(radius: number) {
        const aspectRatio = canvas.width / canvas.height
        if (aspectRatio > 1) radius *= aspectRatio
        return radius
    }

    canvas.addEventListener('mouseover', e => {
        const posX = scaleByPixelRatio(e.offsetX)
        const posY = scaleByPixelRatio(e.offsetY)
        let pointer = pointers.find(p => p.id == -1)
        if (pointer == null) pointer = makePointer()
        updatePointerDownData(pointer, -1, posX, posY)
    })

    canvas.addEventListener('mousemove', e => {
        const pointer = pointers[0]
        if (!pointer || !pointer.down) return
        const posX = scaleByPixelRatio(e.offsetX)
        const posY = scaleByPixelRatio(e.offsetY)
        updatePointerMoveData(pointer, posX, posY)
    })
    // было mouseup
    window.addEventListener('mouseout', () => {
        if (pointers[0]) updatePointerUpData(pointers[0])
    })

    canvas.addEventListener('touchstart', e => {
        e.preventDefault()
        const touches = e.targetTouches
        while (touches.length >= pointers.length) pointers.push(makePointer())
        for (let i = 0; i < touches.length; i++) {
            const posX = scaleByPixelRatio(touches[i]!.pageX)
            const posY = scaleByPixelRatio(touches[i]!.pageY)
            const p = pointers[i + 1]
            if (p) updatePointerDownData(p, touches[i]!.identifier, posX, posY)
        }
    })

    canvas.addEventListener(
        'touchmove',
        e => {
            e.preventDefault()
            const touches = e.targetTouches
            for (let i = 0; i < touches.length; i++) {
                const pointer = pointers[i + 1]
                if (!pointer || !pointer.down) continue
                const posX = scaleByPixelRatio(touches[i]!.pageX)
                const posY = scaleByPixelRatio(touches[i]!.pageY)
                updatePointerMoveData(pointer, posX, posY)
            }
        },
        false
    )

    window.addEventListener('touchend', e => {
        for (const touch of e.changedTouches) {
            const pointer = pointers.find(p => p.id == touch.identifier)
            if (pointer == null) continue
            updatePointerUpData(pointer)
        }
    })

    window.addEventListener('keydown', e => {
        if (e.code === 'KeyP') config.PAUSED = !config.PAUSED
        if (e.key === ' ') splatStack.push(((Math.random() * 20) | 0) + 5)
    })

    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
        pointer.id = id
        pointer.down = true
        pointer.moved = false
        pointer.texcoordX = posX / canvas.width
        pointer.texcoordY = 1.0 - posY / canvas.height
        pointer.prevTexcoordX = pointer.texcoordX
        pointer.prevTexcoordY = pointer.texcoordY
        pointer.deltaX = 0
        pointer.deltaY = 0
        pointer.color = generateColor()
    }

    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
        pointer.prevTexcoordX = pointer.texcoordX
        pointer.prevTexcoordY = pointer.texcoordY
        pointer.texcoordX = posX / canvas.width
        pointer.texcoordY = 1.0 - posY / canvas.height
        pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)
        pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
    }

    function updatePointerUpData(pointer: Pointer) {
        pointer.down = false
    }

    function correctDeltaX(delta: number) {
        const aspectRatio = canvas.width / canvas.height
        if (aspectRatio < 1) delta *= aspectRatio
        return delta
    }

    function correctDeltaY(delta: number) {
        const aspectRatio = canvas.width / canvas.height
        if (aspectRatio > 1) delta /= aspectRatio
        return delta
    }

    type Color = { r: number; g: number; b: number }

    function generateColor(): Color {
        const c = HSVtoRGB(Math.random(), 1, 1.0)
        c.r *= 0.15
        c.g *= 0.1
        c.b *= 0.27
        return c

        // везде было по 0.15 изначально
    }

    function HSVtoRGB(h: number, s: number, v: number): Color {
        let r = 0,
            g = 0,
            b = 0
        const i = Math.floor(h * 6)
        const f = h * 6 - i
        const p = v * (1 - s)
        const q = v * (1 - f * s)
        const t = v * (1 - (1 - f) * s)

        switch (i % 6) {
            case 0:
                ;(r = v), (g = t), (b = p)
                break
            case 1:
                ;(r = q), (g = v), (b = p)
                break
            case 2:
                ;(r = p), (g = v), (b = t)
                break
            case 3:
                ;(r = p), (g = q), (b = v)
                break
            case 4:
                ;(r = t), (g = p), (b = v)
                break
            case 5:
                ;(r = v), (g = p), (b = q)
                break
        }

        return {
            r,
            g,
            b
        }
    }

    function normalizeColor(input: Color): Color {
        return {
            r: input.r / 255,
            g: input.g / 255,
            b: input.b / 255
        }
    }

    function wrap(value: number, min: number, max: number) {
        const range = max - min
        if (range == 0) return min
        return ((value - min) % range) + min
    }

    function getResolution(resolution: number) {
        let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio

        const min = Math.round(resolution)
        const max = Math.round(resolution * aspectRatio)

        if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min }
        else return { width: min, height: max }
    }

    function getTextureScale(texture: Texture, width: number, height: number) {
        return {
            x: width / texture.width,
            y: height / texture.height
        }
    }

    function scaleByPixelRatio(input: number) {
        const pixelRatio = window.devicePixelRatio || 1
        return Math.floor(input * pixelRatio)
    }

    function hashCode(s: string) {
        if (s.length == 0) return 0
        let hash = 0
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i)
            hash |= 0 // Convert to 32bit integer
        }
        return hash
    }
}
