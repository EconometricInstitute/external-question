export default function compare(obj1, obj2, decimals)
{
    // If one object is not truthy and the other one is, they are not equal
    if ((obj1 && !obj2) || (!obj1 && obj2)) {
        return false;
    }

    // If both objects are null, they are equal
    if (obj1 == null && obj2 == null) {
        return true;
    }

    // If both objects are undefined they are equal
    if (obj1 == undefined && obj2 == undefined) {
        return true;
    }

    // If they is still one object null or undefined, they are not equal
    if (obj1 == undefined || obj1 == null || obj2 == null || obj2 == undefined) {
        return false;
    }

    // If they types do not match, the objects are not equal
	if (typeof obj1 != typeof obj2) {
		return false;
	}
	
    // Is one of the objects is an array while the other is not, they are not equal
	if (Array.isArray(obj1) != Array.isArray(obj2)) {
		return false;
	}
	
    // String and boolean can be compared directly
	if (typeof obj1 == 'string' || typeof obj1 == 'boolean') {
		return obj1 == obj2;
	}
	
    // Numbers are compared by converting them to a string with a fixed number of decimals
	if (typeof obj1 == 'number')
	{
		return obj1.toFixed(decimals) == obj2.toFixed(decimals);
	}
	
    // If we are comparing arrays, do so element by element
	if (Array.isArray(obj1))
	{
        if (obj1.length != obj2.length) {
            // If the arrays are unequal in length, they are not equal
            return false;
        }
        for (const [index, value] of obj1.entries()) {
            if (!compare(value, obj2[index])) {
                return false;
            }
        }
        return true;
	}
	
    // If the objects have a different number of keys, they are not equal
	if (Object.keys(obj1).length != Object.keys(obj2).length)
	{
		return false;
	}
	
    // For objects, compare the key/value pairs
	for (const [key, value] of Object.entries(obj1))
	{
		if (!(key in obj2))
		{
			return false;
		}
		if (!compare(value, obj2[key], decimals))
		{
			return false;
		}
	}
	
    // If there is some key in the second object but not in the first, they are not equal
	for (const key in obj2)
	{
		if (!(key in obj1))
		{
			return false;
		}
	}
    // We can now assume they are equal.
	return true;
	
}
