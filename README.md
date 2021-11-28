## react-horizontal-datepicker
#### V2 with new logic and completely removing dependency on react-waypoint as well as leaner code which now uses css-modules

A simple and lightweight easily style-able Side scrolling datepicker, built with ❤️

Bundle size of 469 Bytes Minified + Gzipped

![](https://user-images.githubusercontent.com/8018852/78461316-7faf3a80-76e5-11ea-919d-cbf600f29092.png) 

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
| marked  | Object |     | Marking targeted date with text below (Optional) |

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

### Using marked dates

Example:

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
                  marked={[
                      {
                          date: new Date(2021, 9, 3),
                          marked: true,
                          style: {
                              color: "#ff0000",
                              padding: "2px",
                              fontSize: 12,
                          },
                          text: "1x",
                      },
                      {
                          date: new Date(2021, 9, 4),
                          marked: true,
                          text: "5x"
                      },
                  ]}
/>
  );
}
```


### Todo
use react window for efficienc