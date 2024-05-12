export const handleAddItem = (setNewList:any, newList:any, item:any) => {
    if (newList.includes(item) == false) {
        setNewList([...newList, item])
    }
}

export const handleRemoveItem = (setNewList:any, newList:any, item:any) => {
    const updatedList = newList.filter((listItem:any) => listItem != item);
    setNewList(updatedList);
}


export function getIndex(item:any, arr1:any, arr2:any) {
    const foundIndex = arr2.indexOf(item);
    if (foundIndex !== -1) {
        return arr1.indexOf(item);
    } else {
        return -1; // Item not found in array2
    }
}