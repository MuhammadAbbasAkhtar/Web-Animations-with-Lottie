import React,{useState, useEffect, useRef} from "react";
import "./styles.css";
import lottieWeb from 'lottie-web'
import NewIconInput from './NewIconInput'
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import AnimationOptions from './AnimationOptions'
// import animationList from './animationList'
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    flexGrow: 1,
  },
  Hdivider:{
    // height: 1,
    // margin: 4,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  iconBox:{
    height: "63vh",
    overflowY: "auto",
    width: "100%",
    overflowX: "hidden"
  }
}));

const getParent = (child) => {
  var parent;
  if(child.parentNode.parentNode.parentNode.parentNode.nodeName === 'svg')
    parent = child.parentNode.parentNode.parentNode.parentNode
  else 
    parent = child.parentNode.parentNode.parentNode.parentNode.parentNode
  
  return parent

}
const simulateMouseClick = (elementSelector, i) => {
  
  // var evt = new MouseEvent("click", {
  //   view: window,
  //   bubbles: true,
  //   cancelable: true,
  //   /* whatever properties you want to give it */
  // });
  
  // console.log(getParent(ele).getAttribute('name'))
  // ele.dispatchEvent(evt);
   // document.querySelectorAll("#iconBox svg")[i].dispatchEvent(evt) 
}
export default function App() {
  //animationPaths
  const iconBox = useRef()
  const inputRef =  useRef()
  const [userAdded, setUserAdded] = useState(false)
  var list = JSON.parse(localStorage.getItem('list'))
  const [animationPaths, setAnimationPaths] = useState(list)
  const [animsState, setAnimsState] = useState([])
  const [Animations, setAnimations] = useState([])
  const [animationLoop, setLoop] = useState(false)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [inputError, setInputError] =  useState(false)

  const elementClicked = (name) => {
    // console.log('ele clicked')
    
    var obj;
    var arry = animsState
    if(animsState.length === 0){
      obj = { name: name, active:true }
      arry.push(obj)
      Animations.find((v,i) => {
        if(v.name === name){
          v.playSegments([14, 27], true)
          return true
        }
      })

    }
    else{
      obj = arry.find((o,i) => {
        if(o.name === name){
          Animations.find((v,i) => {
            if(v.name === name){
              if(o.active){
                v.playSegments([0, 14], true)
                v.loop = true
              }
              else{
                v.playSegments([14, 27], true)
                v.loop = false
              }
              return true
            }
          })
          arry[i] = {name:o.name, active:!o.active}
          return true; // stop searching
        }
      });
      if(obj === undefined){
        obj = { name: name, active:true }
        arry.push(obj)
      }
    }
    arry.push(9)
     setAnimsState(arry)
     //console.log('Setting animsState',animsState)
     arry.pop()
     setAnimsState(arry)

    //  playSegments([14, 27], true)

  }
  
  const _handleInputSubmit = (e) => {
    e.preventDefault()
    setOpen(true)
    var arry = list
    var value = inputRef.current.value
    var name = /(?=\S*[-])([a-zA-Z'-]+)\.(json)+/g.exec(value)
    
    if(!name){
      let vA = value.split('/')
      vA = vA[vA.length-1]
      name = vA.split('.json')[0]
    }
    if(name){
      setInputError(false)
      var res = arry.find((o,i) => {
        if(o.name !== name[1]){
          return true
        }
      })
      
      if(res !== undefined){
      arry.push({
        name: name[1], path: value
      })
      // setAnimationPaths(arry)
      localStorage.setItem('list', JSON.stringify(arry))
      setUserAdded(true)

      setTimeout(() => {
        handleClose()
        window.location.reload()
      }, 1000);
      
     }
     else{
      setTimeout(() => {
        handleClose()
      }, 500);
     }
    }
    else {
      setInputError(true)
      handleClose()
    }

  }
  useEffect(()=>{
    var animations = Animations;
    // console.log(userAdded, animationList)
    // setAnimationPaths(animationList)
    animationPaths.forEach((v,i) =>{
      

      var animation = lottieWeb.loadAnimation({
        container: iconBox.current,
        path: v.path,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: v.name,
      });
      animation.goToAndStop(14, true)

      animations.push(animation)
      
    })
    setAnimations(animations)
    setOpen(false);

    // if(Animations.length >= animationPaths.length){
      
    //   setTimeout(() => {
    //     Animations.forEach((v, i) => {
    //       // console.log()
    //       simulateMouseClick("#iconBox svg",i)
  
    //     })
    //   }, 500);
    // }
    
  },[ list]) //userAdded


  useEffect(() => {
    
    if(Animations.length === animationPaths.length){
      Animations.forEach((v,i) => {
        Animations[i].renderer.svgElement.setAttribute('name', v.name)
        Animations[i].renderer.svgElement.addEventListener('click', (e)=> {
          elementClicked(getParent(e.target).getAttribute('name'))
        })
      })
      
    }
   
  }, [Animations])
  
  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container spacing={1}  justify="center" direction="column" alignItems="center">
          <Grid container >
              <Grid item xs={12}>
                <h2>Web Animations with Lottie</h2>
                <h5>Get icons from <a href="https://icons8.com/free-animated-icons">here</a></h5>
                <p>click 2 times to activate. Click again to stop animation</p>
                <div id="iconBox" className={classes.iconBox} ref={iconBox}></div>
                <Divider className={classes.Hdivider} orientation="horizontal" />
              </Grid>
          </Grid>
          <Grid item  xs={12}>
            <NewIconInput inputRef={inputRef} cb={_handleInputSubmit}
              error={inputError} 
            />
          </Grid>
          <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
          </Backdrop>
        
        </Grid>
      </div>
    </div>
  );
}
