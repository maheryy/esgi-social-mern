export const ChatList = ({ chats, selected, setSelected }) => {
  return (
    <div className="hidden sm:block sm:basis-1/4 py-8 px-4">
      <ul>
        {chats.map((el, i) => (
          <li
            key={i}
            onClick={() => setSelected(el.id)}
            className={
              (selected === el.id ? "bg-gray-500 " : "") +
              "hover:cursor-pointer"
            }
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
