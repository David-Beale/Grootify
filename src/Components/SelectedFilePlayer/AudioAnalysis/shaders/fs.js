export const _FS = `

varying vec2 vPosition;

const int dots = 20; 
const float radius = .2; 
const float brightness = 0.03;

uniform float resolution;
uniform float data[ 20 ];
uniform float time;


//convert HSV to RGB
vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
		
void main() {
	
	vec2 p=vPosition.xy / resolution;
  p.x += 0.5;
  p.y += 0.5;
  vec3 c=vec3(0,0,0); //background color
		
    for(int i=0;i<dots; i++){
   
      float vol =  data[i];
      float b = vol * vol * brightness;
     
      float x = float(i)/float(dots);
      float y = 0.9;
      vec2 o = vec2(x,y);
       
      vec3 dotCol = hsv2rgb(vec3((float(i) + time)/float(dots),1.,1.0));
       
      float dist1 = clamp(length(p-o),0.05,1.);
      c += b/dist1*dotCol;
    }
  gl_FragColor = vec4(c,1); 
}

`;
