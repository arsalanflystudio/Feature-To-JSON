# Feature to JSON

This project aims at reducing the developer's effort to insert raw data from feature file into Couchbase for testing. This program generates multiple JSON files from the raw data in feature file, suitable to be directly inserted into Couchbase using the Couchbase document inserter. The name of the files can be configured using the options provided after submitting the raw data.

## Example

**Step 1:** Insert the data into the text area and press submit button
```
#| product | currency | price |
#| coffee  | EUR      | 1     |
#| donut   | SEK      | 18    |
```
**Step 2:** Select the appropriate options
Once step 1 is completed, an options pannel will appear. There are two types of options.
1. to specify if a field is an array where values are seperated by coma
2. to specify if a field is not a string ( considers it to be a number )

You can use combination of above properties like when you have an array of numbers, you should check both ***array*** and ***not_string*** curresponding to that field. But if you have an array of strings, then only check the array checkbox.
>By default, all fields are considered as string.

**Step 3:** Enter the name that is to be given to the JSON file
A JSON file will be generated curresponding to each row of data. In this case, two JSON files will get generated. The name of these files need to be defined. The name should contain some dynamic part so that they become distinct. For that, the data from columns can be used.

For example, if you want the files to be named as ***data_productName.json***, then the name should be given as ***data_[product]*** in the name field. Any column name given inside square brackets will be replaced with the data from the curresponding column. You can also use multiple column names if you want. For example ***data_[product]_[currency]*** will include currency also to the name. Make sure that the name exactly matches the one given in the table.

**Step 4:** Submit it
Once you submit it, the json files curresponding to your data will start downloading.
