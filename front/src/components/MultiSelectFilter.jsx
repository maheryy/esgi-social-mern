import { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

const MultiSelectFilter = ({ items, selected, setSelected, placeholder, className }) => {
  const [checkAll, setCheckAll] = useState(false);

  return (
    <MultiSelect
      selectedItemsLabel={`${selected.length} éléments séléctionnés`}
      className={className}
      value={selected}
      options={items}
      onChange={(e) => {
        setSelected(e.value);
        setCheckAll(e.value.length === items.length);
      }}
      selectAll={checkAll}
      onSelectAll={(e) => {
        setSelected(e.checked ? [] : items.map(item => item.value));
        setCheckAll(!e.checked);
      }}
      virtualScrollerOptions={{ itemSize: 40 }}
      maxSelectedLabels={3}
      placeholder={placeholder ?? "Sélectionnez un élément"}
    />
  );
};

export default MultiSelectFilter;