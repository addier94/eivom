// import {eivomApi} from 'api';
// import {movieURL} from 'api/eivom';
// import {useEffect, useState} from 'react';

// interface urlType {
//   url?: 'latest' | 'now_playing' | 'popular' | 'top_rated' | 'upcoming'
// }

// export const useMovies = (url: urlType) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [data, setData] = useState<any>();
//   const [error, setError] = useState('');

//   useEffect( () => {
//     async function fetchMovies() {
//       setLoading(true);
//       try {
//         const {data} = await eivomApi.get(`${movieURL}/movie/latest?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}`);
//         setData(data);
//       } catch (error) {
//         setError('Oops somethings happen, try later');
//       }
//       setLoading(false);
//     }
//     fetchMovies();
//   }, []);

//   return {data, loading, error};
// };
import {useEffect, useReducer, useRef} from 'react';

interface State<T> {
  data?: T
  error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {...initialState};
      case 'fetched':
        return {...initialState, data: action.payload};
      case 'error':
        return {...initialState, error: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    const fetchData = async () => {
      dispatch({type: 'loading'});

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({type: 'fetched', payload: cache.current[url]});
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({type: 'fetched', payload: data});
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({type: 'error', payload: error as Error});
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line
    // react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
