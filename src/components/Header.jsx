import React from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const user = {
  name: 'ShepherdCW Fan',
  email: 'shepherdcw_fan@moxa.com',
  imageUrl:
  "data:image/png;base64,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"
}
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Header() {
  
  const onNaviClick = item => {
    setNavigation( 
      navigation.map( n => 
        n.name === item.name ? 
        {...n, current: true} : 
        {...n, current: false} 
      ));
  }

  const [navigation, setNavigation] = useState([
    { name: 'Orgnization Chart', href: '/', current: false },
    { name: 'My Tasks', href: 'my-task', current: false },
    { name: 'Show My Token', href: 'my-token', current: false },
  ]);

  const [userName, setUserName] = useState('');
  useEffect(()=>{
    let queryString = document.location.search
    let urlParams = new URLSearchParams(queryString)
    let userName = urlParams.get("userName")
    if(userName) setUserName(userName);
  });

  return (
    <>
      <Disclosure as="nav" className="bg-gray-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        src="https://cdn-cms.azureedge.net/Moxa/media/Global/logo.svg?ext=.svg"
                        alt="Moxa Inc."
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-base font-medium text-white'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={ () => onNaviClick(item)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                  { userName ? 
                  <div
                  className="group flex justify-center cursor-pointer"
                  >
                    <BellIcon className='text-white transition group-hover:text-white/75 h-8 w-8'></BellIcon>
                    <span className="relative flex h-2 w-2">
                      {/* notification animation */}
                      <span
                        className="absolute inline-flex h-full w-full -left-4 animate-ping rounded-full bg-teal-400 opacity-75"
                      >
                      </span>
                      <span
                        className="relative inline-flex h-2 w-2 -left-4 rounded-full bg-teal-500"
                        >
                      </span>
                    </span>
                  </div>
                  : <BellIcon className='text-white transition group-hover:text-white/75 h-8 w-8'></BellIcon>}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
    </>
  )
}
