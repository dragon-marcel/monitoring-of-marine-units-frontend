//Marcel Dragon
export function createMarker(shipActiv: boolean): HTMLElement {
  
  let size = 10;
  let el = document.createElement("div") as HTMLDivElement;
  el.style["borderRadius"] = "100%";
  el.style["marginLeft"] = `${-size / 2}px`;
  el.style["marginTop"] = `${-size / 2}px`;
  el.style["width"] = `${size}px`;
  el.style["height"] = `${size}px`;
  el.style["background"] = shipActiv ? "red" : "green" ;
  el.style["border"] = "1px solid black";
 
  if(shipActiv){
  el.animate([
    {  opacity: '0.3' }
  ], {
    duration: 1500,
    iterations: Infinity
  });
 }
  return el;
}