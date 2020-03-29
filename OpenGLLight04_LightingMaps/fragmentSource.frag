#version 330 core							   
//in vec4 vertexColor;
in vec2 TextCoord;
in vec3 FragPos;
//∑®œÚ¡ø
in vec3 Normal;

struct Material{
	vec3 ambient; 
	sampler2D diffuse;
	sampler2D specular;
	sampler2D emission;
	float shininess;
};

uniform Material material;
//uniform sampler2D ourTexture;
//uniform sampler2D ourFace; 	
uniform vec3 objColor;
uniform vec3 ambientColor;
uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 cameraPos;

out vec4 FragColor;	
void main()								   
{			
	// FragColor = mix(texture(ourTexture,TextCoord),texture(ourFace,TextCoord),0.2);
	//FragColor = texture(ourTexture,TextCoord)*texture(ourFace,TextCoord);

	
	vec3 lightDir = normalize(lightPos - FragPos);
	vec3 reflectVec =reflect(lightDir,Normal);
	vec3 cameraVec = normalize(cameraPos - FragPos);
	//specular
	float specularAmount = pow(max(dot(reflectVec,cameraVec),0.0f),material.shininess);
	vec3 specular = texture(material.specular,TextCoord).rgb*specularAmount*lightColor;

	//deffuse
	//vec3 diffuse =material.diffuse * max(dot(lightDir,Normal),0.0f)*lightColor;
	vec3 diffuse = texture(material.diffuse,TextCoord).rgb* max(dot(lightDir,Normal),0.0f)*lightColor;

	//ambient
	vec3 ambient = texture(material.diffuse,TextCoord).rgb*ambientColor;

	//emission
	vec3 emission = texture(material.emission,TextCoord).rgb;

	FragColor = vec4((ambient+diffuse+specular)*objColor,1.0f)+vec4(emission,1.0f);
}											   