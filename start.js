
///////////////////////////


////////////////////////
function start(arr,n,startTimer){
  
  if(mouseIsPressed&& mouseX>width-70&&mouseX<width-20&&mouseY>100&&mouseY<150&&f==true){
        return false;
    
      }
  
  let x=map(mouseX,0,width,0,200);
  background(238-x*1.2, 241-x*1.2, 218-x*1.2);
  
  // Shadow
  
  fill(30, 30, 3); 
  rect(width-80, 110, 50, 50, 5);
  
  fill(245, 196, 94);
  rect(width-70,100,50,50,5);
  
  let p=new Particle(width-45,125,0,0,0,0,10);
  p.display();
  arr.push(p);
  for(let i=0;i<n-1;i++){
    for(let k=i+1;k<n;k++){
      
      
      if(dist(arr[i].location.x,arr[i].location.y,arr[k].location.x,arr[k].location.y)<100){
        line(arr[i].location.x,arr[i].location.y,arr[k].location.x,arr[k].location.y);
      }
      
    }
    
    arr[i].update();
    arr[i].display();
  }
  arr[n-1].update();
  arr[n-1].display();
  return true;

  
}
///////////////////////////