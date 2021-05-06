<template>
  <div :id="`${idInput}-parent`">
    <input type="text" :id="idInput" class="form-control autocomplete" />
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["idInput", "data"],
  data() {
    return {
      min: moment(new Date()).format("YYYY-MM-DD"),
      currentFocus: -1,
    };
  },
  methods: {
    //
    // handleChangeValue() {
    //   var x = document.getElementById
    // },

    addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      this.removeActive(x);
      if (this.currentFocus >= x.length) this.currentFocus = 0;
      if (this.currentFocus < 0) this.currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[this.currentFocus].classList.add("autocomplete-active");
    },
    removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    },
    closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
      const inp = document.getElementById(this.idInput);
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    },
    autocomplete(inp, arr) {
      inp.addEventListener("input", () => {
        var a,
          b,
          i,
          val = inp.value;
        this.closeAllLists();
        if (!val) {
          return false;
        }
        this.currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        inp.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function () {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              this.closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });
      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
        increase the this.currentFocus variable:*/
          this.currentFocus++;
          /*and and make the current item more visible:*/
          this.addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
        decrease the this.currentFocus variable:*/
          this.currentFocus--;
          /*and and make the current item more visible:*/
          this.addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (this.currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[this.currentFocus].click();
          }
        }
      });

      document.addEventListener("click", (e) => {
        this.closeAllLists(e.target);
      });
    },
  },
  mounted() {
    this.autocomplete(document.getElementById(`${this.idInput}`), this.data);
  },
};
</script>

<style>
</style>