let number_of_circles = 60;
let radius = 50;
let circles = [];
let velocity = 0.0005;
let collition_distance = radius/2;

function getCircle(){
    let x = Math.floor(Math.random() * innerWidth);
    let dirX = Math.floor(Math.random() * 11) -5; //[-5,5]
    let y = Math.floor(Math.random() * innerHeight);
    let dirY = Math.floor(Math.random() * 11) -5; //[-5,5]
    let color = Math.floor(Math.random() * 256);
    if(dirX==0 || dirY==0) return getCircle();
    return {"x":x, "y":y, "dirX":dirX, "dirY":dirY, "color":color};
}

function circleIsColliding(i, all_circles){
    for(let j=0;j<all_circles.length;j++){
        if(j==i) continue;
        let c1 = all_circles[i].x - all_circles[j].x;
        let c2 = all_circles[i].y - all_circles[j].y;
        let dist = Math.sqrt( c1*c1 + c2*c2 );
        if( dist <= collition_distance ) return true;
    }
    return false;
}

function moveCirclesToNextFrame(all_circles){
    for(let i=0;i<circles.length;i++){
        if( circleIsColliding(i, all_circles) ){
            all_circles[i].dirX *= -1;
            all_circles[i].x += all_circles[i].dirX * velocity * (all_circles[i].color+1);
            all_circles[i].dirY *= -1;
            all_circles[i].y += all_circles[i].dirY * velocity * (all_circles[i].color+1);
            // TODO: improve collitions
            all_circles[i].x += Math.floor(Math.random() * 5) -2; // [-1,1]
            all_circles[i].y += Math.floor(Math.random() * 5) -2;
            continue;
        }

        if(all_circles[i].x + all_circles[i].dirX * velocity * (all_circles[i].color+1) <= 0
        || all_circles[i].x + all_circles[i].dirX * velocity * (all_circles[i].color+1) >= innerWidth ) 
            all_circles[i].dirX *= -1;
        all_circles[i].x += all_circles[i].dirX * velocity * (all_circles[i].color+1);

        if(all_circles[i].y + all_circles[i].dirY * velocity * (all_circles[i].color+1) <= 0
            || all_circles[i].y + all_circles[i].dirY * velocity * (all_circles[i].color+1) >= innerWidth ) 
                all_circles[i].dirY *= -1;
            all_circles[i].y += all_circles[i].dirY * velocity * (all_circles[i].color+1);
    }
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    for(let i=0;i<number_of_circles;i++){
        circles.push(getCircle()); 
        while(circleIsColliding(i, circles)) circles[i] = getCircle();
    }   
}

function draw() {
    background(220);
    for(let i=0;i<circles.length;i++){
        moveCirclesToNextFrame(circles);
        fill(circles[i].color);
        circle(circles[i].x, circles[i].y, radius * circles[i].color/100);  
    }
}