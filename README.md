# Web Animations with Lottie
[Bodymovin](https://exchange.adobe.com/creativecloud.details.12557.bodymovin.html) is a plugin for Adobe After Effects that exports animations as JSON, and [Lottie](https://airbnb.io/lottie/) is the library that renders them natively on mobile and on the web.

[Icons8](https://icons8.com/) has a lot of free animated icons in JSON which we can use

The Bodymovin player library is statically hosted [here](https://cdnjs.com/libraries/bodymovin) and can be dropped into the HTML that way, but it is also available as a package:
``` 
npm install lottie-web ### or yarn add lottie-web 
```

You could also import the library as a module from Skypack:
```
import lottieWeb from "https://cdn.skypack.dev/lottie-web";
```

# Canvas vs SVG
Animations can also be rendered on canvas element. However, canvas doesn’t render quite as nicely and doesnt support scaling

### Example
I'm using this [animated play/pause control icon](https://icons8.com/free-animated-icons/pause) from [Icons8](https://icons8.com/).

Here loop and autoplay is set to true

![](https://raw.githubusercontent.com/MuhammadAbbasAkhtar/Web-Animations-with-Lottie/main/zVtNYzTs.gif)
