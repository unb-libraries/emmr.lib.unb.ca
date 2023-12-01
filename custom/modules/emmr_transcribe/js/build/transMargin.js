!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.transMargin=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";r.d(n,{default:()=>d});var e=r("ckeditor5/src/core.js"),t=r("ckeditor5/src/widget.js");class i extends e.Command{execute(){const{model:e}=this.editor;e.change((t=>{e.insertContent(function(e){let t=prompt("Enter transcription marginalia text");if(t){const r=e.createElement("transMargin"),n=e.createElement("transMarginNumber");e.appendText("#",{},n);const i=e.createElement("transMarginText");return e.appendText(t,{},i),e.append(n,r),e.append(i,r),r}return}(t))}))}refresh(){const{model:e}=this.editor,{selection:t}=e.document,r=e.schema.findAllowedParent(t.getFirstPosition(),"transMargin");this.isEnabled=null!==r}}class s extends e.Plugin{static get requires(){return[t.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertTransMargin",new i(this.editor))}_defineSchema(){const e=this.editor.model.schema;e.register("transMargin",{isObject:!0,allowWhere:"$text"}),e.register("transMarginNumber",{isLimit:!0,allowIn:"transMargin",allowContentOf:"$block"}),e.register("transMarginText",{isLimit:!0,allowIn:"transMargin",allowContentOf:"$block"}),e.addChildCheck(((e,t)=>{if(e.startsWith("trans")&&"transMargin"===t.name)return!1}))}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"transMargin",view:{name:"trxnmar"}}),e.for("upcast").elementToElement({model:"transMarginNumber",view:{name:"span",classes:"trxn-number"}}),e.for("upcast").elementToElement({model:"transMarginText",view:{name:"span",classes:"trxn-text"}}),e.for("dataDowncast").elementToElement({model:"transMargin",view:{name:"trxnmar"}}),e.for("dataDowncast").elementToElement({model:"transMarginNumber",view:{name:"span",classes:"trxn-number"}}),e.for("dataDowncast").elementToElement({model:"transMarginText",view:{name:"span",classes:"trxn-text"}}),e.for("editingDowncast").elementToElement({model:"transMargin",view:(e,{writer:r})=>{const n=r.createContainerElement("trxnmar",{});return(0,t.toWidget)(n,r,{label:"Transcription marginalia widget"})}}),e.for("editingDowncast").elementToElement({model:"transMarginNumber",view:(e,{writer:r})=>{const n=r.createContainerElement("span",{class:"trxn-number"});return(0,t.toWidget)(n,r)}}),e.for("editingDowncast").elementToElement({model:"transMarginText",view:(e,{writer:r})=>{const n=r.createEditableElement("span",{class:"trxn-text"});return(0,t.toWidgetEditable)(n,r)}})}}var a=r("ckeditor5/src/ui.js");class o extends e.Plugin{init(){const e=this.editor;e.ui.componentFactory.add("transMargin",(t=>{const r=e.commands.get("insertTransMargin"),n=new a.ButtonView(t);return n.set({label:e.t("Transcription Marginalia"),icon:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.95154 2.84131C1.95154 2.28902 2.39925 1.84131 2.95154 1.84131H17.0484C17.6007 1.84131 18.0484 2.28902 18.0484 2.84131V17.1588C18.0484 17.7111 17.6007 18.1588 17.0484 18.1588H2.95154C2.39925 18.1588 1.95154 17.7111 1.95154 17.1588V2.84131ZM3.5116 8.10129H16.4926V15.3194C16.4926 15.8717 16.0449 16.3194 15.4926 16.3194H4.5116C3.95931 16.3194 3.5116 15.8717 3.5116 15.3194V8.10129ZM4.44415 3.81676C3.89187 3.81676 3.44415 4.26447 3.44415 4.81676V6.35087H16.4316V4.81676C16.4316 4.26447 15.9838 3.81676 15.4316 3.81676H4.44415Z" fill="black"/></svg>\n',tooltip:!0}),n.bind("isOn","isEnabled").to(r,"value","isEnabled"),this.listenTo(n,"execute",(()=>e.execute("insertTransMargin"))),n}))}}class l extends e.Plugin{static get requires(){return[s,o]}}const d={TransMargin:l}})(),n=n.default})()));