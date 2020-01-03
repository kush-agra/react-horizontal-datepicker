## react-horizontal-datepicker
A fully style-able horizontal date picker with the option to scroll for web
![Example](https://i.imgur.com/oe3WEGF.jpg)

### Installation

Run `yarn add react-horizontal-datepicker`

### Usage

Import:

`import DatePicker from "react-horizontal-datepicker";`

and use as:

```javascript
<DatePicker/>
```

Available Props are

| Prop          | Type    | Default  | Description |
| ------------- |:-------:| :-------:| ----------- |
| shouldScroll  | Boolean | false    | Set List to be scrollable |
| getSelectedDay| Function|          | Function to get the selected Day |
| endDate       | Number  |   90     | Number of days to render from current date   |

endDate currently has no effect on non scrolling list

Example:

```javascript
function App() {

    const selectedDay = (val) =>{
        console.log(val)
    };

  return (
      <DatePicker getSelectedDay={selectedDay} shouldScroll={true} endDate={100}/>
  );
}
```

