import Select from 'react-select'


export const MultipleSelect = ({ searchResults, setSelectedUsers, handleSearch }) => {
  return (
    <div className='mt-4' >
        <Select 
            options={ searchResults }
            onChange={ setSelectedUsers }
            onKeyDown={ (e) => handleSearch(e) }
            placeholder='Search, select users'
            formatOptionLabel={(user) => (
                <div className='flex items-center gap-1' >
                    <img 
                        src={ user.picture } 
                        alt='' 
                        className='w-8 h-8 object-cover rounded-full' 
                    />
                    <span className='text-[#222]' >{ user.label }</span>
                </div>
            )}
            isMulti
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    borderColor: 'transparent',
                    background: 'transparent'
                })
            }}
        />
    </div>
  )
}
