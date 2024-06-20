import { createClient } from "@/lib/supabase/client";
/**
 * Updates a row in a specified table in Supabase.
 *
 * @param {string} tableName - The name of the table to update.
 * @param {object} eq - The condition to find the specific row to update.
 * @param {object} update - The object containing the updated values.
 * @returns {Promise<object>} - The result of the update operation.
 */
const updateTableRow = async (tableName: string, eq: object, update: object) => {
    const supabase = createClient()

    const { data, error } = await supabase
    .from(tableName)
    .update(update)
    .match(eq);

  if (error) {
    return `Error updating ${tableName} ${error.message}`
  }

  if (data) {
    return data
  }

}

export default updateTableRow;
