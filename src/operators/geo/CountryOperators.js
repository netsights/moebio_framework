import StringList from "src/dataStructures/strings/StringList";
/**
 * @classdesc Provides a set of tools that work with {@link Country|Countries}.
 *
 * @namespace
 * @category geo
 */
function CountryOperators() {}
export default CountryOperators;

CountryOperators.getSimplifiedName = function(name) {
  return name.replace(/[\.\- ,\']/g, "").toLowerCase();
};

CountryOperators.getSimplifiedNames = function(names) {
  var simplifiedNames = new StringList();
  var name;
  for(var i = 0; names[i] != null; i++) {
    name = this.getSimplifiedName(names[i]);
    if(name != "") simplifiedNames.pushIfUnique(name);
  }
  return simplifiedNames;
};
