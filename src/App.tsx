import { Box, CssBaseline } from "@material-ui/core";
import { Calendar } from "./Calendar";
import { useState } from "react";
import DatePicker from "./components/DatePicker";
import { today, getLocalTimeZone } from "@internationalized/date";

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const showDetailsHandle = (dayStr: string | null) => {
    setData(dayStr);
    setShowDetails(true);
  };
  return (
    <>
      <CssBaseline>
        <Box>
          <Box>
            <Calendar showDetailsHandle={showDetailsHandle} />
          </Box>
          <Box
            style={{
              marginLeft: "100px",
              marginTop: "20px",
              paddingTop: "5px",
              paddingLeft: "20px",
              paddingBottom: "20px",
              maxWidth: "400px",
              textAlign: "center",
            }}
            boxShadow={3}
          >
            <DatePicker defaultValue={today(getLocalTimeZone())} />
          </Box>
        </Box>
      </CssBaseline>
    </>
  );
}

export default App;
