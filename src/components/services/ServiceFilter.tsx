/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Input,
  Row,
  Select,
  Slider,
  SliderSingleProps,
  Typography
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const marks: SliderSingleProps["marks"] = {
  0: "0",
  50: "50",
  100: "100",
  150: "150",
  200: "200"
};

const ServiceFilter = ({
  onSearch,
  priceRange,
  onSortByPrice
}: {
  onSearch: any;
  priceRange: any;
  onSortByPrice: any;
}) => {
  return (
    <Row
      gutter={18}
      style={{
        border: ".5px solid #c4c4c4",
        borderRadius: "5px",
        padding: "20px",
        margin: "50px 0"
      }}
    >
      <Col md={8} sm={24}>
        <Typography.Title level={5}>Search</Typography.Title>
        <Input
          addonAfter={<SearchOutlined />}
          onChange={onSearch}
          size="large"
          placeholder="Search"
        />
      </Col>
      <Col md={8} sm={24}>
        <Typography.Title level={5}>Select price range</Typography.Title>
        <Slider
          marks={marks}
          range
          defaultValue={[0, 100]}
          min={0}
          max={200}
          onChangeComplete={priceRange}
        />
      </Col>

      <Col md={8} sm={24}>
        <Typography.Title level={5}>Sort by Price</Typography.Title>
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          allowClear
          options={[
            { value: "", label: "Select" },
            { value: "asc", label: "Low to high" },
            { value: "desc", label: "High to low" }
          ]}
          placeholder="Select"
          onSelect={onSortByPrice}
        />
      </Col>
    </Row>
  );
};

export default ServiceFilter;
