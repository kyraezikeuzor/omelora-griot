import { format } from 'date-fns';

export const handleAddItem = (setNewList:any, newList:any, item:any) => {
    if (newList.includes(item) == false) {
        setNewList([...newList, item])
    }
}

export function handleGetIndex(item:any, arr1:any, arr2:any) {
    const foundIndex = arr2.indexOf(item);
    if (foundIndex !== -1) {
        return arr1.indexOf(item);
    } else {
        return -1; // Item not found in array2
    }
}

export function handleToDate(date:string) {
    var formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return formattedDate;
}

export function handleToFileIdFromPostItle(postTitle:string,postDate:string) {
    const stopwords = [
        "in", "on", "at", "by", "for", "of", "to", "with", "without", "through",
        "over", "under", "above", "below", "about", "the", "a", "an", "that",
        "those", "these", "which", "what", "about", "are", "is", "become", "became",
        "was", "were", "his", "hers", "it", "its", "she", "he", "they", "whose",
        "their", "theirs", "our", "ours", "has", "had", "been", "could", "can",
        "would", "had", "have", "because", "and", "yet", "but", "here", "there",
        "this", "here’s", "let’s", "’", "how", "who", "when", "where", "why",
        "one", "two"
    ];

    function removeStopwords(text: string): string {
        const regex = new RegExp(`\\b(${stopwords.join('|')})\\b\\s*`, 'gi');
        return text.replace(regex, '');
    }

    function sanitizeTitle(title: string): string {
        return title
            .toLowerCase()
            .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+$/, '');
    }

    const postDateStr = postDate ? format(new Date(postDate), 'yyyy') + '-' : '';
    const titleSlug = sanitizeTitle(removeStopwords(postTitle));
    return postDateStr + titleSlug;
}