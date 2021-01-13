export default function fixList(){
  var list = localStorage.getItem('list')
  if(list){
    list = JSON.parse(list)
    list.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
    var dupsCount = 0;
    for (var i = 0; i < list.length - 1; ) {
        if (list[i].name == list[i + 1].name) {
            dupsCount++;
            list.splice(i, 1);
        } else {
            i++;
        }
    }
    localStorage.setItem('list', JSON.stringify(list))
    // console.log(list)
  }
}

