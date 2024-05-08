export const handleAddItem = (setNewList:any, newList:any, item:any) => {
    if (newList.includes(item) == false) {
        setNewList([...newList, item])
    }
}

export const handleRemoveItem = (setNewList:any, newList:any, item:any) => {
    const updatedList = newList.filter((listItem:any) => listItem !== item);
    setNewList(updatedList);
}

export const checkPageRefreshing = (event:any) => {
    // Check if the event's type is "beforeunload"
    if (event.type === 'beforeunload') {
        return true
    }
};