
export default function onSelectTable(param: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) {
    const detectedSelectObj = selected.some((selectObj: string) => selectObj === param);
  
    if (!detectedSelectObj) {
      setSelected((prevState: string[]) => [...prevState, param]);
    } else {
      setSelected((prevState: string[]) => prevState.filter((selectedObj: string) => selectedObj !== param));
    }
  }