import { typeOf } from "./type-check.js";

/**
 * fetch ヘルパクラス
 */
class FetchHelper {
  static JsonType = 'application/json';

  /**
   * 
   * @param {*} headers 
   * @returns 
   */
  isJson(headers) {
    const contentType = headers.get('Content-Type');
    if (!contentType) {
      return null;
    }
    return contentType.includes('json');
  }

  /**
   * create URL class instance
   * @param {string|URL} url string or URL
   * @returns URL class
   */
  createURLClass(url) {
    if(url instanceof URL) {
      return url;
    }
    else if (url instanceof String) {
      return new URL(url);
    }
    return null;
  }

  /**
   * set searchParams
   * @param {URL} url 
   * @param {Map<string, string>|Record<string, any>} urlParams 
   */
  setURLSearchParams(url, urlParams) {
    if (urlParams instanceof Map) {
      for (const [k, v] of urlParams) {
        url.searchParams.set(k, v);
      }
    }
    else if (typeOf(urlParams) === "object") {
      for (const [k, v] of urlParams.entries()) {
        url.searchParams.set(k, v);
      }
    }
  }

  /**
   * parse response data
   * @param {Response} result 
   * @returns result data
   */
  async parseResponse(result) {
    let data = {
      ok: result.ok,
      status: result.status,
    };
    let rawText = null;
    try {
      if (this.isJson(result.headers)) {
        rawText = await result.text();
        data.type = 'json';
        data.json = JSON.parse(rawText);
      }
      else {
        rawText = await result.text();
        data.type = 'text';
        data.text = rawText;
      }
    }
    catch (error) {
      data.type = 'text';
      data.text = rawText;
    }
    return data;
  }

  /**
   * fetch get resources
   * @param {string|URL} url URL
   * @param {Map<string, string>|Record<string, any>} urlParams URL parameters
   * @returns response data (res.type := 'json'|'text', res.text := {response-text}, res.json := {response-json})
   */
  async get(url, urlParams = {}) {
    const urlCls = this.createURLClass(url);
    this.setURLSearchParams(urlCls, urlParams);
    
    const result = await fetch(urlCls, {
      method: 'GET',
      headers: {
        'Accept': WebQuery.JsonType
      }
    });
    const res = await this.parseResponse(result);
    return res;
  }

  /**
   * fetch post resources
   * @param {string|URL} url URL
   * @param {any} body fetch body
   * @param {Record<string, any>} options header options
   * @returns response data (res.type := 'json'|'text', res.text := {response-text}, res.json := {response-json})
   */
  async post(url, body, options = {}) {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': WebQuery.JsonType,
        'Accept': WebQuery.JsonType,
        ...options,
      },
      body: body
    });

    const res = await this.parseResponse(result);
    return res;
  }

  /**
   * fetch put resources
   * @param {string|URL} url URL
   * @param {any} body fetch body
   * @param {Record<string, any>} options header options
   * @returns response data (res.type := 'json'|'text', res.text := {response-text}, res.json := {response-json})
   */
  async put(url, body, options = {}) {
    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': WebQuery.JsonType,
        'Accept': WebQuery.JsonType,
        ...options,
      },
      body: body
    });

    const res = await this.parseResponse(result);
    return res;
  }

  /**
   * fetch delete resources
   * @param {string|URL} url URL
   * @param {any} body fetch body
   * @param {Record<string, any>} options header options
   * @returns response data (res.type := 'json'|'text', res.text := {response-text}, res.json := {response-json})
   */
  async delete(url, options = {}) {
    const result = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': WebQuery.JsonType,
        ...options,
      }
    });

    const res = await this.parseResponse(result);
    return res;
  }
}

export { FetchHelper };