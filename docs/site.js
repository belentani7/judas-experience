(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-copy-url]").forEach(button => {
    button.addEventListener("click", async () => {
      const url = button.getAttribute("data-copy-url");
      const status = document.querySelector(".copy-status");
      if (!url) return;
      try {
        await navigator.clipboard.writeText(url);
        if (status) status.textContent = "Enlace copiado.";
      } catch {
        if (status) status.textContent = "No se pudo copiar automáticamente; abre el enlace desde el botón.";
      }
    });
  });

  const canvas = document.getElementById("judas-field");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) return;

  const vertex = `attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}`;
  const fragment = `precision highp float;
    uniform vec2 r; uniform float t; uniform vec2 m;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
    void main(){
      vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y); vec2 q=uv; q.x+=m.x*.06; q.y-=m.y*.06;
      float d=length(q); float a=atan(q.y,q.x); float rings=sin(d*18.-t*.22+a*1.7)*.5+.5;
      float n=noise(q*3.+t*.025)+noise(q*7.-t*.018)*.35;
      float glow=exp(-3.8*d)+exp(-55.*abs(d-.62))*0.7+exp(-90.*abs(d-.88))*0.32;
      vec3 red=vec3(.95,.10,.12), black=vec3(.015,.008,.012), white=vec3(.8,.78,.74);
      vec3 col=mix(black,red,glow*.42); col+=white*rings*.025*exp(-1.7*d); col+=red*n*.018;
      float vign=1.-smoothstep(.35,1.25,d); gl_FragColor=vec4(col*vign, .82*vign);
    }`;
  const compile = (type, source) => { const s=gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s); return s; };
  const program=gl.createProgram(); gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex)); gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment)); gl.linkProgram(program);
  const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(program,"p"), rLoc=gl.getUniformLocation(program,"r"), tLoc=gl.getUniformLocation(program,"t"), mLoc=gl.getUniformLocation(program,"m");
  let mx=0,my=0;
  window.addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
  const resize=()=>{const d=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;gl.viewport(0,0,canvas.width,canvas.height);};
  addEventListener("resize",resize); resize();
  const start=performance.now();
  const frame=now=>{gl.useProgram(program);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);gl.uniform2f(rLoc,canvas.width,canvas.height);gl.uniform1f(tLoc,(now-start)/1000);gl.uniform2f(mLoc,mx,my);gl.drawArrays(gl.TRIANGLES,0,6);requestAnimationFrame(frame);};
  requestAnimationFrame(frame);
})();
