// const processTasje = (svg) => {
//     const parser = new DOMParser();
//     const tasje = parser.parseFromString(svg, "text/html").body.firstChild;
//     const coordinates = [];
//     tasje.querySelectorAll("path").forEach((pathElement) => {
//       const dAttribute = pathElement.getAttribute("d");
//       const strippedPath = dAttribute
//         .replace(/[A-Za-z]\s*[\d\s,]*/g, (match) => {
//           return match
//             .trim()
//             .split(/[A-Za-z,\s]+/)
//             .join(" ");
//         })
//         .trim();
//       const pairs = strippedPath
//         .split(/\s+/)
//         .reduce((acc, val, index, array) => {
//           if (index % 2 === 0) {
//             acc.push([
//               parseFloat(val),
//               parseFloat(array[Math.min(index + 1, array.length)]),
//             ]);
//           }
//           return acc;
//         }, []);
//       coordinates.push(pairs);
//     });
//     const filteredCoordinates = coordinates.flat();
//     setMapje(filteredCoordinates);
//     return filteredCoordinates;
//   };

//   const setTasje = (tasje) => {
//     setSetup((prevSetup) => {
//       let nextSetup;
//       if (tasje) {
//         const coordinates = processTasje(tasje);
//         const tasjeDotsCount = Math.min(Math.max(coordinates.length, 50), 300);
//         nextSetup = {
//           ...prevSetup,
//           tasje,
//           tasjeDotsCount,
//         };
//       } else {
//         nextSetup = {
//           ...prevSetup,
//           tasje: null,
//           stencil: 0,
//           tasjeDotsCount: null,
//         };
//         setMapje(null);
//       }
//       sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
//       return nextSetup;
//     });
//   };

// const [svgData, setSvgData] = useState([]);
// const [tasjeIndex, setTasjeIndex] = useState(null);

// const handleFileUpload = (event) => {
//   const file = event.target.files[0];

//   if (file && file.type === "image/svg+xml") {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const svgContent = reader.result;
//       setTasje(svgContent);
//     };
//     reader.readAsText(file);
//   } else {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const imageSrc = e.target.result;
//       const trace = new Potrace();
//       trace.setParameters({
//         turdSize: 1020,
//         optTolerance: 800,
//       });
//       trace.loadImage(imageSrc, (error) => {
//         if (error) {
//           console.error("Error loading image:", error);
//           return;
//         }
//         const svg = trace.getSVG();
//         setTasje(svg);
//       });
//     };
//     reader.readAsDataURL(file);
//   }
// };

// const handleTasjeClick = (svgContent, index) => {
//   if (tasjeIndex !== index) {
//     setTasje(svgContent);
//     setTasjeIndex(index);
//   } else {
//     setTasjeIndex(null);
//     setTasje(null);
//     setSetup((prevSetup) => {
//       return {
//         ...prevSetup,
//         stencil: 0,
//       };
//     });
//   }
// };

// useEffect(() => {
//   const importAll = (r) => {
//     return r.keys().map(r);
//   };
//   const tasjes = importAll(
//     require.context("./tasjes/", false, /\.(png|jpe?g|svg)$/)
//   );

//   const loadSvgFiles = async () => {
//     const svgPromises = tasjes.map((fileNumber) =>
//       fetch(fileNumber).then((response) => response.text())
//     );
//     const loadedSvgData = await Promise.all(svgPromises);
//     setSvgData(loadedSvgData);
//   };

//   loadSvgFiles();
// }, []);


// const tasjeNav = <nav
//   className={`menu menu--filters menu--${menuVisibilityClass} menu--${isRoostertjeClass}`}
// >
//   <div className="tasjes">
//     {svgData.map((svgContent, index) => (
//       <button
//         key={index}
//         className={`navtasje ${
//           index === tasjeIndex ? "selected" : "unselected"
//         }`}
//         dangerouslySetInnerHTML={{ __html: svgContent }}
//         onClick={() => handleTasjeClick(svgContent, index)}
//       />
//     ))}
//     {setup.tasje && (
//       <ControlGroup
//         {...{ setup, handleInputChange }}
//         controls={defaultSetup.filter(
//           (control) => !control.isHidden && control.isRight
//         )}
//       />
//     )}
//     <input
//       type="file"
//       accept=".svg, .png, .jpg"
//       onChange={handleFileUpload}
//       placeholder="Add an tasje"
//       key={"add-tasje-input"}
//       id="add-tasje"
//       className="add-tasje"
//     />
//     <label
//       htmlFor="add-tasje"
//       className="control__button"
//       key={"add-tasje-label"}
//     >
//       Add tasje
//     </label>
//   </div>
// </nav>;
