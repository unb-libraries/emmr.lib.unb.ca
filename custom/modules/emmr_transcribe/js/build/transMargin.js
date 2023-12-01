!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.transMargin=e())}(self,(()=>(()=>{var t={"ckeditor5/src/core.js":(t,e,n)=>{t.exports=n("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(t,e,n)=>{t.exports=n("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(t,e,n)=>{t.exports=n("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,n),s.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var r={};return(()=>{"use strict";n.d(r,{default:()=>d});var t=n("ckeditor5/src/core.js"),e=n("ckeditor5/src/widget.js");class i extends t.Command{execute(){const{model:t}=this.editor;t.change((e=>{t.insertContent(function(t){let e=prompt("Enter transcription marginalia text");if(e){const n=t.createElement("transMargin"),r=t.createElement("transMarginNumber");t.appendText("#",{},r);const i=t.createElement("transMarginText");return t.appendText(e,{},i),t.append(r,n),t.append(i,n),n}return}(e))}))}refresh(){const{model:t}=this.editor,{selection:e}=t.document,n=t.schema.findAllowedParent(e.getFirstPosition(),"transMargin");this.isEnabled=null!==n}}class s extends t.Plugin{static get requires(){return[e.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertTransMargin",new i(this.editor))}_defineSchema(){const t=this.editor.model.schema;t.register("transMargin",{isObject:!0,allowWhere:"$text"}),t.register("transMarginNumber",{isLimit:!0,allowIn:"transMargin",allowContentOf:"$block"}),t.register("transMarginText",{isLimit:!0,allowIn:"transMargin",allowContentOf:"$block"}),t.addChildCheck(((t,e)=>{if(t.startsWith("trans")&&"transMargin"===e.name)return!1}))}_defineConverters(){const{conversion:t}=this.editor;t.for("upcast").elementToElement({model:"transMargin",view:{name:"trxnmar"}}),t.for("upcast").elementToElement({model:"transMarginNumber",view:{name:"span",classes:"trxn-number"}}),t.for("upcast").elementToElement({model:"transMarginText",view:{name:"span",classes:"trxn-text"}}),t.for("dataDowncast").elementToElement({model:"transMargin",view:{name:"trxnmar"}}),t.for("dataDowncast").elementToElement({model:"transMarginNumber",view:{name:"span",classes:"trxn-number"}}),t.for("dataDowncast").elementToElement({model:"transMarginText",view:{name:"span",classes:"trxn-text"}}),t.for("editingDowncast").elementToElement({model:"transMargin",view:(t,{writer:n})=>{const r=n.createContainerElement("trxnmar",{});return(0,e.toWidget)(r,n,{label:"Transcription marginalia widget"})}}),t.for("editingDowncast").elementToElement({model:"transMarginNumber",view:(t,{writer:n})=>{const r=n.createContainerElement("span",{class:"trxn-number"});return(0,e.toWidget)(r,n)}}),t.for("editingDowncast").elementToElement({model:"transMarginText",view:(t,{writer:n})=>{const r=n.createEditableElement("span",{class:"trxn-text"});return(0,e.toWidgetEditable)(r,n)}})}}var o=n("ckeditor5/src/ui.js");class a extends t.Plugin{init(){const t=this.editor;t.ui.componentFactory.add("transMargin",(e=>{const n=t.commands.get("insertTransMargin"),r=new o.ButtonView(e);return r.set({label:t.t("Transcription Marginalia"),icon:'<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg\n   width="20"\n   height="20"\n   viewBox="0 0 20 20"\n   fill="none"\n   version="1.1"\n   id="svg4"\n   xmlns="http://www.w3.org/2000/svg"\n   xmlns:svg="http://www.w3.org/2000/svg">\n  <defs\n     id="defs8" />\n  <rect\n     style="fill:#ff0000;stroke:#ff0000;stroke-width:1.0081;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none"\n     id="rect69602"\n     width="5.5952306"\n     height="10.298982"\n     x="1.9995608"\n     y="4.8505092" />\n  <text\n     xml:space="preserve"\n     style="font-style:normal;font-weight:normal;font-size:13.3333px;line-height:0.45;font-family:sans-serif;letter-spacing:3px;fill:#ff0000;fill-opacity:1;stroke:none;stroke-width:0.73082"\n     x="2.190721"\n     y="14.417307"\n     id="text3311"><tspan\n       x="2.190721"\n       y="14.417307"\n       id="tspan12819"\n       style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;font-family:Gayathri;-inkscape-font-specification:\'Gayathri Bold\';stroke-width:0.73082"><tspan\n         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;font-family:Gayathri;-inkscape-font-specification:\'Gayathri Bold\';fill:#000000;stroke-width:0.73082"\n         id="tspan21361"><tspan\n   style="font-size:13.3333px;fill:#ffffff;stroke:#ffffff;stroke-width:0.73082;stroke-opacity:1"\n   id="tspan74244">1</tspan>A</tspan></tspan><tspan\n       x="2.190721"\n       y="20.359011"\n       style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;font-family:Gayathri;-inkscape-font-specification:\'Gayathri Bold\';stroke-width:0.73082"\n       id="tspan41515" /><tspan\n       x="2.190721"\n       y="26.300711"\n       style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:13.3333px;font-family:Gayathri;-inkscape-font-specification:\'Gayathri Bold\';stroke-width:0.73082"\n       id="tspan40301" /></text>\n</svg>\n',tooltip:!0}),r.bind("isOn","isEnabled").to(n,"value","isEnabled"),this.listenTo(r,"execute",(()=>t.execute("insertTransMargin"))),r}))}}class l extends t.Plugin{static get requires(){return[s,a]}}const d={TransMargin:l}})(),r=r.default})()));