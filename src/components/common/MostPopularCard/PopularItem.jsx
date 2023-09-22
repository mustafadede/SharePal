function PopularItem(data) {
  return (
    <div className="py-2 mt-4 cursor-pointer group">
      <div>
        <p className="pb-1 transition-colors xl:text-lg lg:text-md text-fuchsia-600 group-hover:text-slate-300">
          {data.data.original_title || data.data.original_name}
        </p>
        <p className="text-sm transition-colors text-slate-600 group-hover:text-slate-700">
          {data.data.release_date || data.data.first_air_date}
        </p>
      </div>
    </div>
  );
}

export default PopularItem;
