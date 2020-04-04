## react-horizontal-datepicker
###### V2 with new logic and completely removing dependancy on react-waypoint as well as leaner code which now uses css-modules

A simple and lightweight easily style-able Side scrolling datepicker, built with ❤️
|                                     |                                     |
:------------------------------------ |:------------------------------------:
 ![](https://i.imgur.com/2vawdez.jpg) | ![](https://i.imgur.com/3IYCCPJ.jpg) 
 ![](https://i.imgur.com/0aixw6v.jpg) | ![](https://i.imgur.com/M467k3A.jpg) 
 

### Installation

Run `yarn add react-horizontal-datepicker`
or
Run `npm i react-horizontal-datepicker`

### Usage

Import:

`import DatePicker from "react-horizontal-datepicker";`

and simply use the component as:

```javascript
<DatePicker />
```

example at the end

#### Available Props are

| Prop          | Type    | Default  | Description |
| ------------- |:-------:| :-------:| ----------- |
| getSelectedDay  | Function |     | Function to get the selected Day |
| endDate         | Number|      90    | Number of days to render from current date |
| selectDate       | Date  |        | prop to send selected date manually or from another calendar component |
| color    | String    |    'rgb(54, 105, 238)'      | Set the primary color can be any color format in string |
| labelFormat | String | 'MMMM yyyy' | Month label format - uses [date-fns format](https://date-fns.org/v1.30.1/docs/format) types |

### Example:

https://codesandbox.io/s/vigilant-newton-gn0g7

```javascript
function App() {

    const selectedDay = (val) =>{
        console.log(val)
    };

  return (
      <DatePicker getSelectedDay={selectedDay}
                  endDate={100}
                  selectDate={new Date("2020-04-30")}
                  labelFormat={"MMMM"}
                  color={"#374e8c"}          
/>
  );
}
```

### Todo
maybe use react window for efficiency

