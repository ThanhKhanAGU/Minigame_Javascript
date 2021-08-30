const $$  = document.querySelectorAll.bind(document);
const $  = document.querySelector.bind(document);
const game  = $('.game');
const characterList = {};

function character(id,...classList)
{
    if(id==undefined)
    {
        console.error("Error: bạn phải nhập vào id của nhận vật.");
    }else
    {
        if(characterList[id]==undefined)
        {
            var obj = document.createElement('div');
            obj.style = `position: absolute;transform: translate(-50%,-50%);height: 50px; width: 50px;top: 0;left: 0;box-sizing: border-box;`;
            classList.map((item)=>obj.classList.add(item));
            game.appendChild(obj);
            
            obj.type = 0;
            obj.x = () =>{return obj.offsetLeft};
            obj.y = () =>{return obj.offsetTop};

            obj.gotoX = (value) =>{obj.style.left = `${value}px`;};
            obj.gotoY = (value) =>{obj.style.top = `${value}px`; };
            obj.gotoXY = (x,y) =>{obj.style.left = `${x}px`;obj.style.top = `${y}px`; };

            obj.plusX = (value = 1) =>{obj.style.left = `${value+obj.x()}px`;};
            obj.plusY = (value = 1) =>{obj.style.top = `${value+obj.y()}px`; };
            
            obj.setW = (value) =>{obj.style.width = `${value}px`}; 
            obj.setH = (value) =>{obj.style.height = `${value}px`} ;
            obj.setWH = (w,h) =>{obj.style.height = `${h}px`;obj.style.width = `${w}px`}; 
            obj.width= ()=>{return obj.offsetWidth};
            obj.height = ()=>{return obj.offsetHeight};

            obj.addClass = (class_List) =>
            {
                let List = class_List.trim().split(" ");
                List.map((item)=>{obj.classList.add(item);});
                return obj;
            }

            obj.deleteClass = (class_List) =>
            {
                let List = class_List.trim().split(" ");
                List.map((item)=>{obj.classList.remove(item);});
                return obj;
            }

            obj.create = (Object)=>
            {
                if(Object.x!=undefined,Object.y!=undefined) obj.gotoXY(Object.x,Object.y);
                if(Object.width!=undefined,Object.height!=undefined) obj.setWH(Object.width,Object.height);
                return obj;
            }

            obj.isCheck = (char,fun_true = undefined,fun_false = undefined,fun_trueOfChar2 = undefined, fun_falseOfChar2 = undefined,  ) =>
            {
                let max_x = char.x() + 0.5*char.width();
                let min_x = char.x() - 0.5*char.width();

                let max_y = char.y() + 0.5*char.height();
                let min_y = char.y() - 0.5*char.height();

                let max_x1 = obj.x() + 0.5*obj.width();
                let min_x1 = obj.x() - 0.5*obj.width();

                let max_y1 = obj.y() + 0.5*obj.height();
                let min_y1 = obj.y() - 0.5*obj.height();

                
                if(min_x >= min_x1 && min_x <= max_x1 || max_x >= min_x1 && max_x <= max_x1)
                {
                    if(max_y >= min_y1 && max_y <= max_y1 || min_y >= min_y1 && min_y <= max_y1)
                    {
                       if(fun_true != undefined) 
                        {
                            fun_true(obj);
                           
                        }
                        if(fun_trueOfChar2 != undefined) 
                        {
                            fun_trueOfChar2(char);
                        }
                        return true;
                    }else
                    {
                        if(fun_false != undefined)
                        {
                            fun_false(obj);
                        }
                        if(fun_falseOfChar2 != undefined)
                        {
                            fun_falseOfChar2(char);
                        }
                        return false;
                    }
                }else 
                {
                    if(fun_false != undefined)
                    {
                        fun_false(obj);
                    }
                    if(fun_falseOfChar2 != undefined)
                    {
                        fun_falseOfChar2(char);
                    }
                    return false;
                }

            }

            obj.delete = () =>
            {
                game.removeChild(obj);
                characterList[obj.id] = undefined;
            }
            obj.is
            obj.id = id;
            characterList[id] = obj;
            return obj;
        }else{
            console.error("Error: id này đã được sử dụng");
        }
    }
}

var character1 = character('c1','box').create({"width":200,"height":150,"x":200,"y":300})

var character2 = character('c2','box','box-green').create({"width":100,"height":100,"x":0,"y":300})


var i = 0;
var j =0;
var speed = 5;
function animation()
{
    if(j==0)
    {
        if(i<800)
        {
            i+=speed;
            
        }else
        {
            j=1;
        }
    }
    else
    {
        if(i>0)
        {
            i-=speed;
            
        }else
        {
            j=0;
        }
    }
    character2.gotoX(i);
    character1.isCheck(character2,undefined,undefined,
    (e)=>{
        e.addClass("check");
    },(e)=>{
        e.deleteClass("check");
    })
    requestAnimationFrame(animation)
}
animation();

