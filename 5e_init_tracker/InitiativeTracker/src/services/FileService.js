let fileList;

export async function loadCharacterFile(callback) {
  let fileInput = document.getElementById("my_character");
  //opens file explorer by programatically clicking input in html
  fileInput.click();
  //wait for file to be selected
  fileInput.onchange = function (event) {
    fileList = fileInput.files;
    const reader = new FileReader();
    if (fileList[0]) {
      reader.readAsText(fileList[0]);
      reader.onload = async (e) => {
        const text = e.target.result;
        fileInput.value = "";
        callback(JSON.parse(text));
      };
    }
  };
}

export async function loadMonsterFile(callback) {
  let fileInput = document.getElementById("my_monster");
  //opens file explorer by programatically clicking input in html
  fileInput.click();
  //wait for file to be selected
  fileInput.onchange = function (event) {
    fileList = Array.from(fileInput.files);

    let json = [];
    let fileName = "";
    let count = 0;
    fileList.forEach((file, index) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          json = json.concat(JSON.parse(e.target.result));
          count++;
          fileName +=
            count === fileList.length ? "and " + file.name : file.name + ", ";
        };
        reader.onloadend = function (event) {
          if (count === fileList.length) {
            callback(fileName, json);
          }
        };
        reader.readAsText(file);
      }
    });
  };
}
