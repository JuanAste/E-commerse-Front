import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Select = styled.select`
  padding: 10px;
  width: 200px;
  border-radius: 5px;
`;


export default function CategoryFilters({
  categoryRelation,
  propertiesToFill,
  setNewR,
  handleProductProp,
  properties,
}) {
  const router = useRouter();
  const { r, id } = router.query;
  return (
    <Container>
      <div>
        <label>Category</label>
        <div>
          <Select
            value={r ? r : id}
            onChange={(ev) => setNewR(ev.target.value)}
          >
            {categoryRelation?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {propertiesToFill?.map((p, index) => (
        <div key={index}>
          <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
          <div>
            <Select
              value={properties[p.name]}
              onChange={(ev) => {
                handleProductProp(p.name, ev.target.value);
              }}
            >
              <option value={""}>All</option>
              {p.values.map((v, index) => (
                <option key={index} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
        </div>
      ))}
    </Container>
  );
}
