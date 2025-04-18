//TODO Kממש את אפדייט שוו ורנדר

class Softbody{
  
  constructor(points,drawcurve){
    
    this.Vec2D = toxi.geom.Vec2D;
    this.Rect = toxi.geom.Rect;
    this.VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
    this.VerletParticle2D = toxi.physics2d.VerletParticle2D;
    this.VerletSpring2D = toxi.physics2d.VerletSpring2D;
    this.GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
    this.physics = new this.VerletPhysics2D();
    
  
    this.drawcurve = drawcurve;
    this.points = points
    
    
    this.particles=this.insertparticles()
    this.springs=this.insertsprings()
    
    
    let bounds = new this.Rect(0, 0, 500,500);
    this.physics.setWorldBounds(bounds);
    this.physics.addBehavior(new this.GravityBehavior(new this.Vec2D(0,0.5)))
  }
  
  insertparticles(){
    
    
    var particles=[]
  
    for(let i = 0 ; i<this.points.length;i++){
      
    var pt = this.points[i];
    var particle = new this.VerletParticle2D(pt[0],pt[1]);
    particles.push(particle)
    this.physics.addParticle(particle)
      
    
    
  }
   return particles 
  }
  
  update(){
    this.physics.update()
  }
  
  show(){
    
    if (!this.drawcurve){//makes a shape out of the particles without curve
      
    fill(200,0,0,100)
    beginShape()
      
    for(var par of this.particles){
    circle(par.x,par.y,2)
    vertex(par.x,par.y)
    }
      
  endShape(CLOSE)
    }
    
  else{
    //makes a curve
    
    for(let i = 0;i<this.particles.length-3;i++){  
    curve(this.particles[i].x,this.particles[i].y,this.particles[i+1].x,this.particles[i+1].y,this.particles[i+2].x,this.particles[i+2].y,this.particles[i+3].x,this.particles[i+3].y)
      }
    
    curve(this.particles[1].x,this.particles[1].y,this.particles[0].x,this.particles[0].y,this.particles[this.particles.length-1].x,this.particles[this.particles.length-1].y,this.particles[this.particles.length-2].x,this.particles[this.particles.length-2].y)
   
    curve(this.particles[2].x,this.particles[2].y,this.particles[1].x,this.particles[1].y,this.particles[0].x,this.particles[0].y,this.particles[this.particles.length-1].x,this.particles[this.particles.length-1].y)
    
    curve(this.particles[0].x,this.particles[0].y,this.particles[this.particles.length-1].x,this.particles[this.particles.length-1].y,this.particles[this.particles.length-2].x,this.particles[this.particles.length-2].y,this.particles[this.particles.length-3].x,this.particles[this.particles.length-3].y)
    }
  }
  
  render(){
  this.update()
  this.show()
  }

  insertsprings(){
    var springs= []
  for (let i =0;i<this.particles.length;i++){
    for(let j =0;j<this.particles.length;j++){
      if (random(1)<0.3){
      if(i!=j){
      var pt1=this.points[i]
      var pt2=this.points[j]
      var x1=pt1[0]
      var y1=pt1[1]
      var x2=pt2[0]
      var y2=pt2[1]
      var delta =dist(x1,y1,x2,y2)
      var spring = new this.VerletSpring2D(this.particles[i],this.particles[j],delta,0.005)
      
      springs.push(spring)
      this.physics.addSpring(spring)
      }
      }
    }
    }
    return springs
  }
  

  
}