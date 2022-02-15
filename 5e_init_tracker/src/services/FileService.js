let fileList;

export default async function loadFile(callback) {
  let fileInput = document.getElementById("my_file");
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
        fileInput.value = '';
        callback(JSON.parse(text));
      };
    }
  };
}
