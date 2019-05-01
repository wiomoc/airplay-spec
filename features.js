function toLong(s) {
  var ret = s.trim();
  try {
    if (ret.startsWith("0x")) {
      return Long.fromString(ret.substring(2), 16);
    }
    return Long.fromString(ret, 10);
  } catch (e) {
    return Long.ZERO;
  }
}
function setBitClassName(prefix, value, selected, notSelected) {
  for (var i=0; i<65; i++) {
    var b = Long.ONE.shiftLeft(i);
    var el = document.getElementById(prefix + "-bit" + i);
    if (el) {
      if (value.and(b).equals(b)) {
        el.className = selected;
      } else {
        el.className = notSelected;
      }
    }
  }
}
function featuresExample(el) {
  document.getElementById("airplay-features-input").value = el.value;
  updateFeatures(el.value);
}
function featuresChanged(el) {
  document.getElementById("airplay-features-examples").value = "";
  updateFeatures(el.value);
}

function updateFeatures(featuresS) {
  var comma = featuresS.indexOf(",");
  var features = 0;
  if (comma >= 0) {
    var high = toLong(featuresS.substring(comma + 1));
    var low = toLong(featuresS.substring(0, comma));
    features = high.shiftLeft(32).or(low);
  } else {
    features = toLong(featuresS);
  }
  if (features.equals(Long.ZERO)) {
    document.getElementById("airplay-features-output").className = "noscript";
    setBitClassName("airplay-features", Long.ZERO, "", "")
  } else {
    document.getElementById("airplay-features-output").className = "";
    setBitClassName("airplay-features", features, "selected", "notSelected")
  }

  document.getElementById("airplay-features-dec").innerHTML = features.toString(10);
  document.getElementById("airplay-features-hex").innerHTML = "0x" + features.toString(16);
  var txt = "0x" + features.and(Long.fromBits(0xffffffff, 0, true)).toString(16) +
    ",0x" + features.shiftRight(32).toString(16);
  document.getElementById("airplay-features-txt").innerHTML = txt;
}

function systemFlagsExample(el) {
  document.getElementById("airplay-system-flags-input").value = el.value;
  updateSystemFlags(el.value);
}
function systemFlagsChanged(el) {
  document.getElementById("airplay-system-flags-examples").value = "";
  updateSystemFlags(el.value);
}

function updateSystemFlags(systemFlagsS) {
  var systemFlags = 0;
  systemFlags = toLong(systemFlagsS);
  if (systemFlags.equals(Long.ZERO)) {
    document.getElementById("airplay-system-flags-output").className = "noscript";
    setBitClassName("airplay-system-flags", Long.ZERO, "", "")
  } else {
    document.getElementById("airplay-system-flags-output").className = "";
    setBitClassName("airplay-system-flags", systemFlags, "selected", "notSelected")
  }

  document.getElementById("airplay-system-flags-dec").innerHTML = systemFlags.toString(10);
  document.getElementById("airplay-system-flags-hex").innerHTML = "0x" + systemFlags.toString(16);
}

featuresChanged(document.getElementById("airplay-features-input"));
systemFlagsChanged(document.getElementById("airplay-system-flags-input"));
document.getElementById("airplay-features-interactive").className = "";
document.getElementById("airplay-system-flags-interactive").className = "";
